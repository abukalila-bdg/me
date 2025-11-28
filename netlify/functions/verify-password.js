exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { password } = JSON.parse(event.body);
        const SECRET_PASSWORD = process.env.SECRET_PASSWORD;

        if (!SECRET_PASSWORD) {
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Server configuration error" }),
            };
        }

        if (password === SECRET_PASSWORD) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: "Incorrect password" }),
            };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: "Invalid request" }),
        };
    }
};
