use wbs_db_local;

const cursor = db.getCollection('socExecDashboard').find({ isLive: true });

cursor.forEach(doc => {
    const socItem = doc.soc?.[0];
    print('------------------------------');
    print(`Processing doc: ${doc.siDieId || doc._id}`);

    if (!socItem || !socItem.value) {
        print(`⚠️ soc.0.value missing in doc ${doc.siDieId || doc._id}`);
        return;
    }

    const val = socItem.value;

    // Robust check if it's a Date
    if (Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime())) {
        const hours = val.getUTCHours();
        const minutes = val.getUTCMinutes();
        const seconds = val.getUTCSeconds();
        const ms = val.getUTCMilliseconds();

        if (hours === 0 && minutes === 0 && seconds === 0 && ms === 0) {
            print('✅ Already normalized Date object. Skipping...');
            return;
        } else {
            const normalizedDate = new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                0, 0, 0, 0
            ));
            print(`♻️ Normalized existing Date: ${normalizedDate.toISOString()}`);
            db.getCollection('socExecDashboard').updateOne(
                { _id: doc._id },
                { $set: { 'soc.0.value': normalizedDate } }
            );
            return;
        }
    }

    // MM/DD/YY or MM/DD/YYYY
    if (typeof val === 'string' && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(val)) {
        const [mm, dd, yyOrYYYY] = val.split('/');
        let yyyy = yyOrYYYY.length === 2 ? `20${yyOrYYYY}` : yyOrYYYY.padStart(4, '20');
        const isoStr = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}T00:00:00.000Z`;
        const parsedDate = new Date(isoStr);

        if (!isNaN(parsedDate.getTime())) {
            print(`✅ Parsed MM/DD/YY -> ${parsedDate.toISOString()}`);
            db.getCollection('socExecDashboard').updateOne(
                { _id: doc._id },
                { $set: { 'soc.0.value': parsedDate } }
            );
            return;
        } else {
            print(`❌ Invalid MM/DD/YY string: ${val}`);
            return;
        }
    }

    // ISO 8601 string format (with or without time)
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
        const isoDate = new Date(val);
        if (!isNaN(isoDate.getTime())) {
            const normalizedDate = new Date(Date.UTC(
                isoDate.getUTCFullYear(),
                isoDate.getUTCMonth(),
                isoDate.getUTCDate(),
                0, 0, 0, 0
            ));
            print(`ℹ️ ISO string parsed & normalized: ${normalizedDate.toISOString()}`);
            db.getCollection('socExecDashboard').updateOne(
                { _id: doc._id },
                { $set: { 'soc.0.value': normalizedDate } }
            );
            return;
        } else {
            print(`❌ Invalid ISO string: ${val}`);
            return;
        }
    }

    // Fallback: detect if value is a date-like object (ex: printed as "Fri Jun 20 2025...")
    if (typeof val === 'object' && val instanceof Date) {
        const normalized = new Date(Date.UTC(
            val.getUTCFullYear(),
            val.getUTCMonth(),
            val.getUTCDate(),
            0, 0, 0, 0
        ));
        print(`♻️ Normalized object-Date: ${normalized.toISOString()}`);
        db.getCollection('socExecDashboard').updateOne(
            { _id: doc._id },
            { $set: { 'soc.0.value': normalized } }
        );
        return;
    }

    // Final fallback for unsupported types
    print(`⚠️ Unsupported format or type: (${typeof val}) - ${val}`);
});