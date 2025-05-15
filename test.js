use wbs_db_local;

const cursor = db.getCollection('socExecDashboard').find({ isLive: true });

cursor.forEach(doc => {
    const socItem = doc.soc?.[0];
    print('------------------------------');
    print(`Processing doc: ${doc._id}`);

    if (socItem && socItem.value) {
        const val = socItem.value;

        // Case 1: Already a Date object
        if (val instanceof Date) {
            print('✅ Already a Date object. Skipping...');
            return;
        }

        // Case 2: MM/DD/YY or MM/DD/YYYY
        if (typeof val === 'string' && /^\d{2}\/\d{2}\/\d{2,4}$/.test(val)) {
            const [mm, dd, yyOrYYYY] = val.split('/');
            let yyyy = yyOrYYYY;

            // Convert YY to YYYY
            if (yyOrYYYY.length === 2) {
                yyyy = `20${yyOrYYYY}`;
            }

            const isoStr = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
            const parsedDate = new Date(isoStr);

            if (!isNaN(parsedDate.getTime())) {
                print(`✅ Parsed and updating: ${parsedDate.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': parsedDate.toISOString() } }
                );
            } else {
                print(`❌ Invalid date from string: ${val}`);
            }
        }

        // Case 3: ISO string format (but stored as string)
        else if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
            const isoDate = new Date(val);
            if (!isNaN(isoDate.getTime())) {
                print(`ℹ️ ISO-like string parsed: ${isoDate.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': isoDate.toISOString() } }
                );
            } else {
                print(`❌ Invalid ISO string: ${val}`);
            }
        }

        // Unknown/unsupported format
        else {
            print(`⚠️ Unsupported format or type: ${JSON.stringify(val)}`);
        }
    } else {
        print(`⚠️ soc.0.value missing in doc ${doc._id}`);
    }
});