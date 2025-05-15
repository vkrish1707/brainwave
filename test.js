const cursor = db.getCollection('your_collection_name').find({ isLive: true });

cursor.forEach(doc => {
    const socItem = doc.soc?.[0];
    
    if (socItem && typeof socItem.value === 'string') {
        const [mm, dd, yy] = socItem.value.split('/');
        if (mm && dd && yy) {
            // Convert to ISO date with time 00:00:00
            const fullDate = new Date(`20${yy}-${mm}-${dd}T00:00:00.000Z`);
            
            db.getCollection('your_collection_name').updateOne(
                { _id: doc._id },
                { $set: { 'soc.0.value': fullDate.toISOString() } }
            );
        }
    }
});