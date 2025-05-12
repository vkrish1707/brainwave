exports.update_employee_skill_set = async function (req, res) {
    const { workWeek, employeeId, newValue } = req.body;
    const connection = snowflake.createConnection(configParams);

    try {
        if (!connection.isUp()) {
            await connection.connectAsync();
        }

        // Update query
        const updateQuery = `
            UPDATE global_workforce
            SET SKILL_SET = ?
            WHERE WEEK_NUM = ? AND EMPLOYEE_ID = ?
        `;

        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: updateQuery,
                binds: [newValue, workWeek, employeeId],
                complete: function (err) {
                    if (err) {
                        console.error("Skill set update failed:", err.message);
                        return reject(err);
                    }
                    resolve();
                }
            });
        });

        // Select the updated row
        const selectQuery = `
            SELECT * FROM global_workforce
            WHERE WEEK_NUM = ? AND EMPLOYEE_ID = ?
        `;

        const updatedRow = await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: selectQuery,
                binds: [workWeek, employeeId],
                complete: function (err, stmt, rows) {
                    if (err) {
                        console.error("Failed to fetch updated row:", err.message);
                        return reject(err);
                    }
                    resolve(rows[0]); // Assuming only one row will match
                }
            });
        });

        res.status(200).json({
            message: "Skill set updated successfully",
            updatedRow
        });

    } catch (err) {
        console.error("Update employee skill set failed:", err.message);
        res.status(500).json({ error: err.message });
    } finally {
        connection.destroy((err) => {
            if (err) console.error("Error closing connection:", err.message);
        });
    }
};