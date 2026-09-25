const compareBtn = document.getElementById("compareBtn");

compareBtn.addEventListener("click", function () {

    const profile1 = document.getElementById("profile1").value.trim();
    const profile2 = document.getElementById("profile2").value.trim();

    const authorization =
        document.getElementById("authorization").checked;

    if (!profile1 || !profile2) {
        alert("Please enter both profile URLs.");
        return;
    }

    if (!authorization) {
        alert("Please confirm that you own these profiles or are authorized to analyze them.");
        return;
    }

    if (!isValidURL(profile1) || !isValidURL(profile2)) {
        alert("Please enter valid URLs.");
        return;
    }

    const profileData1 = {
        description: "Web developer interested in technology and photography.",
        links: [
            "https://example.com",
            "https://github.com/example"
        ],
        visibleInfo: [
            "Technology",
            "Photography",
            "GitHub link"
        ]
    };

    const profileData2 = {
        description: "Software student | Photography enthusiast.",
        links: [
            "https://example.com",
            "https://linkedin.com/in/example"
        ],
        visibleInfo: [
            "Software student",
            "Photography",
            "LinkedIn link"
        ]
    };

    compareProfiles(profileData1, profileData2);
});


function isValidURL(url) {

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}


function compareProfiles(profile1, profile2) {

    document.getElementById("results").classList.remove("hidden");

    document.getElementById("description1").textContent =
        profile1.description;

    document.getElementById("description2").textContent =
        profile2.description;


    const commonLinks =
        profile1.links.filter(link =>
            profile2.links.includes(link)
        );

    const commonLinksElement =
        document.getElementById("commonLinks");

    commonLinksElement.innerHTML = "";

    if (commonLinks.length === 0) {

        commonLinksElement.innerHTML =
            "<li>No overlapping links found.</li>";

    } else {

        commonLinks.forEach(link => {

            const li = document.createElement("li");

            li.textContent = link;

            commonLinksElement.appendChild(li);

        });
    }


    const differences =
        findDifferences(
            profile1.visibleInfo,
            profile2.visibleInfo
        );

    const differencesElement =
        document.getElementById("differences");

    differencesElement.innerHTML = "";

    differences.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        differencesElement.appendChild(li);

    });


    generatePrivacySuggestions(
        profile1,
        profile2
    );


    generateCrossExposure(
        profile1,
        profile2
    );
}


function findDifferences(info1, info2) {

    const differences = [];

    info1.forEach(item => {

        if (!info2.includes(item)) {

            differences.push(
                `Profile 1 shows: ${item}`
            );

        }

    });


    info2.forEach(item => {

        if (!info1.includes(item)) {

            differences.push(
                `Profile 2 shows: ${item}`
            );

        }

    });


    if (differences.length === 0) {

        differences.push(
            "No major differences detected."
        );

    }

    return differences;
}


function generatePrivacySuggestions(profile1, profile2) {

    const suggestions = [];

    suggestions.push(
        "Review whether all linked websites need to be publicly visible."
    );

    suggestions.push(
        "Check whether the same personal information is necessary on both profiles."
    );

    suggestions.push(
        "Avoid publishing sensitive personal information such as your home address or private contact details."
    );

    suggestions.push(
        "Review privacy settings regularly on each platform."
    );

    const list =
        document.getElementById("privacySuggestions");

    list.innerHTML = "";

    suggestions.forEach(suggestion => {

        const li = document.createElement("li");

        li.textContent = suggestion;

        list.appendChild(li);

    });
}


function generateCrossExposure(profile1, profile2) {

    const exposureList =
        document.getElementById("crossExposure");

    exposureList.innerHTML = "";

    const profile1Only =
        profile1.visibleInfo.filter(
            item => !profile2.visibleInfo.includes(item)
        );

    const profile2Only =
        profile2.visibleInfo.filter(
            item => !profile1.visibleInfo.includes(item)
        );


    profile1Only.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            `Profile 1 contributes additional information: ${item}`;

        exposureList.appendChild(li);

    });


    profile2Only.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            `Profile 2 contributes additional information: ${item}`;

        exposureList.appendChild(li);

    });


    if (
        profile1Only.length === 0 &&
        profile2Only.length === 0
    ) {

        const li = document.createElement("li");

        li.textContent =
            "Both profiles expose similar information.";

        exposureList.appendChild(li);

    }
}


/* QR CODE */

window.addEventListener("load", function () {

    const qrContainer =
        document.getElementById("qrcode");

    if (qrContainer && typeof QRCode !== "undefined") {

        new QRCode(qrContainer, {
            text: window.location.href,
            width: 200,
            height: 200
        });

    }

});