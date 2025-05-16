use wbs_db_local;

const cursor = db.getCollection('socExecDashboard').find({ isLive: true });

cursor.forEach(doc => {
    const socItem = doc.soc?.[0];
    print('------------------------------');
    print(`Processing doc: ${doc.siDieId || doc._id}`);

    if (socItem && socItem.value) {
        const val = socItem.value;

        // Case 1: If it's a Date object
        if (val instanceof Date) {
            const iso = val.toISOString();
            const timePart = iso.split('T')[1];

            if (timePart !== '00:00:00.000Z') {
                const normalized = new Date(iso.split('T')[0] + 'T00:00:00.000Z');
                print(`🛠 Normalizing Date -> ${normalized.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': normalized } }
                );
            } else {
                print('✅ Already normalized date. Skipping...');
            }

            return;
        }

        // Case 2: MM/DD/YY or MM/DD/YYYY format
        if (typeof val === 'string' && /^\d{2}\/\d{2}\/\d{2,4}$/.test(val)) {
            const [mm, dd, yyOrYYYY] = val.split('/');
            let yyyy = yyOrYYYY.length === 2 ? `20${yyOrYYYY}` : yyOrYYYY;
            const isoStr = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
            const parsed = new Date(isoStr);

            if (!isNaN(parsed.getTime())) {
                print(`✅ Converted MM/DD/YY -> ${parsed.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': parsed } }
                );
            } else {
                print(`❌ Invalid MM/DD/YY string: ${val}`);
            }

            return;
        }

        // Case 3: ISO string but stored as string
        if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
            const parsed = new Date(val);
            if (!isNaN(parsed.getTime())) {
                const normalized = new Date(parsed.toISOString().split('T')[0] + 'T00:00:00.000Z');
                print(`ℹ️ ISO string parsed & normalized: ${normalized.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': normalized } }
                );
            } else {
                print(`❌ Invalid ISO string: ${val}`);
            }

            return;
        }

        // Unknown/unsupported format
        print(`⚠️ Unsupported format or type: (${typeof val}) - ${val instanceof Date ? val.toISOString() : val}`);
    } else {
        print(`⚠️ soc.0.value missing in doc ${doc.siDieId || doc._id}`);
    }
});