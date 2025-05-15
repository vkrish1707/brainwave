use wbs_db_local;

const cursor = db.getCollection('socExecDashboard').find({ isLive: true });

cursor.forEach(doc => {
    const socItem = doc.soc?.[0];
    print('----------------------------------');
    print(`Processing doc: ${doc._id}`);

    if (socItem && typeof socItem.value === 'string') {
        print(`Original soc value: ${socItem.value}`);
        const [mm, dd, yy] = socItem.value.split('/');
        print(`Parsed => MM: ${mm}, DD: ${dd}, YY: ${yy}`);

        if (mm && dd && yy) {
            const isoString = `20${yy}-${mm}-${dd}T00:00:00.000Z`;
            print(`Constructed ISO String: ${isoString}`);

            const fullDate = new Date(isoString);

            if (!isNaN(fullDate.getTime())) {
                print(`Valid date: ${fullDate.toISOString()}`);
                db.getCollection('socExecDashboard').updateOne(
                    { _id: doc._id },
                    { $set: { 'soc.0.value': fullDate.toISOString() } }
                );
            } else {
                print(`Invalid date detected: ${isoString}`);
            }
        } else {
            print('Date parts are not valid.');
        }
    } else {
        print(`Skipping doc ${doc._id}, soc.0.value is not a string`);
    }
});