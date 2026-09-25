const compareBtn = document.getElementById("compareBtn");

compareBtn.addEventListener("click", function () {
    const profile1Url = document.getElementById("profile1").value.trim();
    const profile2Url = document.getElementById("profile2").value.trim();
    const authorization = document.getElementById("authorization").checked;

    if (!profile1Url || !profile2Url) {
        alert("Please enter both profile URLs.");
        return;
    }

    if (!authorization) {
        alert("Please confirm that you own these profiles or have authorization to analyze them.");
        return;
    }

    try {
        new URL(profile1Url);
        new URL(profile2Url);
    } catch (error) {
        alert("Please enter valid profile URLs.");
        return;
    }

    compareProfiles(profile1Url, profile2Url);
});


function compareProfiles(profile1Url, profile2Url) {

    // Demo data for Profile 1
    const profileData1 = {
        description:
            "Web developer interested in technology and photography.",

        links: [
            "https://example.com",
            "https://github.com"
        ],

        visibleInfo: [
            "Technology",
            "Photography",
            "Web development"
        ]
    };


    // Demo data for Profile 2
    const profileData2 = {
        description:
            "Software student and photography enthusiast.",

        links: [
            "https://example.com",
            "https://linkedin.com"
        ],

        visibleInfo: [
            "Software student",
            "Photography",
            "Student"
        ]
    };


    document.getElementById("results").classList.remove("hidden");


    document.getElementById("description1").textContent =
        profileData1.description;


    document.getElementById("description2").textContent =
        profileData2.description;


    // Find overlapping links
    const commonLinks = profileData1.links.filter(function (link) {
        return profileData2.links.includes(link);
    });


    const commonLinksList =
        document.getElementById("commonLinks");

    commonLinksList.innerHTML = "";


    if (commonLinks.length === 0) {

        const li = document.createElement("li");

        li.textContent =
            "No overlapping public links found.";

        commonLinksList.appendChild(li);

    } else {

        commonLinks.forEach(function (link) {

            const li = document.createElement("li");

            li.textContent = link;

            commonLinksList.appendChild(li);

        });
    }


    findDifferences(profileData1, profileData2);

    generatePrivacySuggestions();

    generateCrossExposure(profileData1, profileData2);
}


function findDifferences(profile1, profile2) {

    const differencesList =
        document.getElementById("differences");

    differencesList.innerHTML = "";


    const differences1 =
        profile1.visibleInfo.filter(function (info) {

            return !profile2.visibleInfo.includes(info);

        });


    const differences2 =
        profile2.visibleInfo.filter(function (info) {

            return !profile1.visibleInfo.includes(info);

        });


    differences1.forEach(function (info) {

        const li = document.createElement("li");

        li.textContent =
            "Profile 1 shows: " + info;

        differencesList.appendChild(li);

    });


    differences2.forEach(function (info) {

        const li = document.createElement("li");

        li.textContent =
            "Profile 2 shows: " + info;

        differencesList.appendChild(li);

    });


    if (
        differences1.length === 0 &&
        differences2.length === 0
    ) {

        const li = document.createElement("li");

        li.textContent =
            "No major visible differences found.";

        differencesList.appendChild(li);
    }
}


function generatePrivacySuggestions() {

    const suggestionsList =
        document.getElementById("privacySuggestions");

    suggestionsList.innerHTML = "";


    const suggestions = [

        "Review whether all linked websites need to be publicly visible.",

        "Avoid publishing sensitive personal information.",

        "Check whether the same information is visible across multiple profiles.",

        "Review privacy settings regularly on each platform."

    ];


    suggestions.forEach(function (suggestion) {

        const li = document.createElement("li");

        li.textContent = suggestion;

        suggestionsList.appendChild(li);

    });
}


function generateCrossExposure(profile1, profile2) {

    const exposureList =
        document.getElementById("crossExposure");

    exposureList.innerHTML = "";


    const commonInformation =
        profile1.visibleInfo.filter(function (info) {

            return profile2.visibleInfo.includes(info);

        });


    commonInformation.forEach(function (info) {

        const li = document.createElement("li");

        li.textContent =
            "Visible across both profiles: " + info;

        exposureList.appendChild(li);

    });


    const profile1Only =
        profile1.visibleInfo.filter(function (info) {

            return !profile2.visibleInfo.includes(info);

        });


    const profile2Only =
        profile2.visibleInfo.filter(function (info) {

            return !profile1.visibleInfo.includes(info);

        });


    profile1Only.forEach(function (info) {

        const li = document.createElement("li");

        li.textContent =
            "Profile 1 contributes additional information: " + info;

        exposureList.appendChild(li);

    });


    profile2Only.forEach(function (info) {

        const li = document.createElement("li");

        li.textContent =
            "Profile 2 contributes additional information: " + info;

        exposureList.appendChild(li);

    });


    const sharedLinks =
        profile1.links.filter(function (link) {

            return profile2.links.includes(link);

        });


    if (sharedLinks.length > 0) {

        const li = document.createElement("li");

        li.textContent =
            sharedLinks.length +
            " public link(s) appear across both profiles.";

        exposureList.appendChild(li);

    }
}


// QR CODE

window.addEventListener("load", function () {

    const qrContainer =
        document.getElementById("qrcode");


    if (
        qrContainer &&
        typeof QRCode !== "undefined"
    ) {

        qrContainer.innerHTML = "";


        new QRCode(qrContainer, {

            text:
                "https://sushmitha-patlolla.github.io/profile-compare/",

            width: 200,

            height: 200

        });

    }

});
