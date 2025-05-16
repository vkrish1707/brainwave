// Case 1: Already a Date object
if (val instanceof Date) {
    const time = val.getUTCHours() + val.getUTCMinutes() + val.getUTCSeconds() + val.getUTCMilliseconds();
    if (time === 0) {
        print('✅ Already a Date object with 00:00:00.000Z. Skipping...');
        return;
    }

    const normalized = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate()));
    print(`✅ Normalizing Date object: ${normalized.toISOString()}`);
    db.getCollection('socExecDashboard').updateOne(
        { _id: doc._id },
        { $set: { 'soc.0.value': normalized.toISOString() } }
    );
    return;
}