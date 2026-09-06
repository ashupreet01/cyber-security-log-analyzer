function analyzeLogs() {

    const logInput = document
        .getElementById("logInput")
        .value
        .toLowerCase();

    const failedKeywords = [
        "failed password",
        "failed login",
        "login failed",
        "authentication failed"
    ];

    const suspiciousKeywords = [
        "unauthorized",
        "suspicious",
        "malware",
        "attack",
        "breach",
        "intrusion",
        "blocked",
        "error"
    ];

    let failedCount = 0;
    let suspiciousCount = 0;
    let detectedThreats = [];

    failedKeywords.forEach(keyword => {
        const matches = logInput.match(
            new RegExp(keyword, "g")
        );

        if (matches) {
            failedCount += matches.length;
            detectedThreats.push(
                `Failed authentication activity detected: "${keyword}"`
            );
        }
    });

    suspiciousKeywords.forEach(keyword => {
        const matches = logInput.match(
            new RegExp(keyword, "g")
        );

        if (matches) {
            suspiciousCount += matches.length;
            detectedThreats.push(
                `Suspicious keyword detected: "${keyword}"`
            );
        }
    });

    document.getElementById("failedCount").innerText =
        failedCount;

    document.getElementById("suspiciousCount").innerText =
        suspiciousCount;

    let riskLevel = "Safe";

    const totalThreats =
        failedCount + suspiciousCount;

    if (totalThreats >= 6) {
        riskLevel = "High";
    }
    else if (totalThreats >= 3) {
        riskLevel = "Medium";
    }
    else if (totalThreats > 0) {
        riskLevel = "Low";
    }

    document.getElementById("riskLevel").innerText =
        riskLevel;

    const threatList =
        document.getElementById("threatList");

    threatList.innerHTML = "";

    if (detectedThreats.length === 0) {

        threatList.innerHTML =
            "<li>No suspicious activity detected.</li>";

    }
    else {

        detectedThreats.forEach(threat => {

            const li =
                document.createElement("li");

            li.innerText = threat;

            threatList.appendChild(li);

        });

    }

}