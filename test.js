use wbs_db_local;

const cursor = db.getCollection('socExecDashboard').find({ isLive: true });

cursor.forEach(doc => {
    const socItem = doc.soc?.[0];
    print('------------------------------');
    print(`Processing doc: ${doc.socName} ${doc.siDieId}`);

    if (socItem && socItem.value) {
        const val = socItem.value;

        // CASE 1: Already a Date object
        if (val instanceof Date) {
            const time =
                val.getUTCHours() +
                val.getUTCMinutes() +
                val.getUTCSeconds() +
                val.getUTCMilliseconds();

            // If it's midnight already, no need to update
            if (time === 0) {
                print('✅ Already a Date object with 00:00:00.000Z. Skipping...');
                return;
            }

            // Normalize to midnight
            const normalized = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate()));
            print(`✅ Normalizing Date object: ${normalized.toISOString()}`);
            db.getCollection('socExecDashboard').updateOne(
                { _id: doc._id },
                { $set: { 'soc.0.value': normalized.toISOString() } }
            );
            return;
        }

        // CASE 2: MM/DD/YY or MM/DD/YYYY format
        if (typeof val === 'string' && /^\d{2}\/\d{2}\/\d{2,4}$/.test(val)) {
            const [mm, dd, yyOrYYYY] = val.split('/');
            let yyyy = yyOrYYYY.length === 2 ? `20${yyOrYYYY}` : yyOrYYYY;
            const isoStr = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
            const parsedDate = new Date(isoStr);

            if (!Number.isNaN(parsedDate.getTime())) {
                print(`✅ Parsed MM/DD/YYYY string: ${parsedDate.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': parsedDate.toISOString() } }
                );
                return;
            } else {
                print(`❌ Invalid MM/DD/YYYY string: ${val}`);
                return;
            }
        }

        // CASE 3: ISO-like string
        if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
            const isoDate = new Date(val);
            if (!Number.isNaN(isoDate.getTime())) {
                const normalized = new Date(Date.UTC(isoDate.getUTCFullYear(), isoDate.getUTCMonth(), isoDate.getUTCDate()));
                print(`ℹ️ ISO-like string parsed and normalized: ${normalized.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': normalized.toISOString() } }
                );
                return;
            } else {
                print(`❌ Invalid ISO string: ${val}`);
                return;
            }
        }

        // Unknown/unsupported format
        print(`⚠️ Unsupported format or type: ${JSON.stringify(val)}`);
    } else {
        print(`⚠️ soc.0.value missing in doc ${doc.siDieId}`);
    }
});