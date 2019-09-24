getTeam();
function getTeam() {
    let loader = document.getElementById("loader");
    let table = document.getElementById("teammates");
    table.style.display = "none";

    fetch("https://api.myjson.com/bins/adpvt")

        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(function (json) {
            people = json.people;

            printTeam(people);
            loader.style.display = "none";
            table.style.display = "";

        }).catch(function (error) {
            console.log("Request failed: " + error.message);
        });
}

function printTeam(people) {

    let tbody = document.getElementById("table-body");
    for (let i = 0; i < people.length; i++) {

        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdAge = document.createElement("td");
        let tdRole = document.createElement("td");
        let tdTeam = document.createElement("td");
        let tdSeniority = document.createElement("td");
        let tdInfo = document.createElement("td");
        tdInfo.setAttribute("class", "td-info");

        tdName.textContent = people[i].name;
        tdAge.textContent = people[i].age;
        tdRole.textContent = people[i].role;
        tdTeam.textContent = people[i].team;
        tdSeniority.textContent = people[i].seniority;
        tdInfo.innerHTML +=
            `<button onclick = "printModal(people[${i}])" type="button" id="people[${i}]" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                + Info
            </button>`

        tr.append(tdName, tdAge, tdRole, tdTeam, tdSeniority, tdInfo);
        tbody.append(tr);
    }
}

function printModal(people) {

    cleanScreen()
    let tbody = document.getElementById("modal-body");

    let title = document.getElementById("exampleModalLabel");
    title.textContent = people.name;

    let avatar = document.getElementById("avatar");
    avatar.innerHTML += `<img class="avatar" id="avatar" src="${people.contact_info.photo}">`

    let trNick = document.createElement("tr");
    let thNick = document.createElement("th");
    let tdNick = document.createElement("td");

    let trPhone = document.createElement("tr");
    let thPhone = document.createElement("th");
    let tdPhone = document.createElement("td");

    let trSite = document.createElement("tr");
    let thSite = document.createElement("th");
    let tdSite = document.createElement("td");

    let trMail = document.createElement("tr");
    let thMail = document.createElement("th");
    let tdMail = document.createElement("td");

    thNick.textContent = "NickName";
    tdNick.textContent = people.contact_info.nickName;
    thPhone.textContent = "Phone";
    tdPhone.textContent = people.contact_info.phone;
    thSite.textContent = "Site";
    tdSite.textContent = people.contact_info.site;
    thMail.textContent = "Mail";

    if (people.contact_info.email == null) {
        tdMail.innerHTML += "<p> We dont't have any contact info </p>"
    } else {
        tdMail.innerHTML +=
            `<button type="button" class="btn-info">
                <a class="btn-info" href="mailto:${people.contact_info.email}">Send me a mail</a>
            </button>`
    }

    trNick.append(thNick, tdNick);
    trPhone.append(thPhone, tdPhone);
    trSite.append(thSite, tdSite);
    trMail.append(thMail, tdMail);
    tbody.append(trNick, trPhone, trSite, trMail);
}

function cleanScreen() {
    let table = document.getElementById("modal-table");
    let avatar = document.getElementById("avatar");

    for (let i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
    avatar.innerHTML = "";
}
