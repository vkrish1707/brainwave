exports.update_employee_skill_set = async function (req, res) {
    const { workWeek, employeeId, newValue } = req.body;
    const connection = snowflake.createConnection(configParams);

    try {
        if (!connection.isUp()) {
            await connection.connectAsync();
        }

        const updateQuery = `
            UPDATE global_workforce
            SET SKILL_SET = ?
            WHERE WEEK_NUM = ? AND EMPLOYEE_ID = ?
        `;

        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: updateQuery,
                binds: [newValue, workWeek, employeeId],
                complete: function (err, stmt, rows) {
                    if (err) {
                        console.error("Skill set update failed:", err.message);
                        return reject(err);
                    }
                    console.log("Skill set updated successfully.");
                    resolve(rows);
                }
            });
        });

        res.status(200).json({ message: "Skill set updated successfully" });

    } catch (err) {
        console.error("Update employee skill set failed:", err.message);
        res.status(500).json({ error: err.message });
    } finally {
        connection.destroy((err) => {
            if (err) console.error("Error closing connection:", err.message);
        });
    }
};