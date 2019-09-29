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

            printTeam();
            loader.style.display = "none";
            table.style.display = "";
        }).catch(function (error) {
            console.log("Request failed: " + error.message);
        });
}

function printTeam(filteredArray = null) {
    let tbody = document.getElementById("table-body");
    let members = people;

    if (filteredArray != null) {
        members = filteredArray;
    }
    for (let i = 0; i < members.length; i++) {

        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdAge = document.createElement("td");
        let tdRole = document.createElement("td");
        let tdTeam = document.createElement("td");
        let tdSeniority = document.createElement("td");
        let tdInfo = document.createElement("td");
        tdInfo.setAttribute("class", "td-info");

        tdName.textContent = members[i].name;
        tdAge.textContent = members[i].age;
        tdAge.setAttribute("class", "td-age");
        tdRole.textContent = members[i].role;
        tdTeam.textContent = members[i].team;
        tdSeniority.textContent = members[i].seniority;
        tdInfo.innerHTML +=
            `<button onclick = "printModal(people[${i}])" type="button" id="people[${i}]" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                + Info
            </button>`

        tr.append(tdName, tdAge, tdRole, tdTeam, tdSeniority, tdInfo);
        tbody.append(tr);
    }
}

function printModal(people) {

    cleanModal()
    let tbody = document.getElementById("modal-body");
    let title = document.getElementById("exampleModalLabel");
    title.textContent = people.name;
    let avatar = document.getElementById("avatar");
    avatar.innerHTML += `<img class="avatar" id="avatar" src="${people.contact_info.photo}">`

    let trNick = document.createElement("tr");
    let thNick = document.createElement("th");
    let tdNick = document.createElement("td");
    tdNick.setAttribute("class", "nick");

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
        tdMail.innerHTML += "<p>We dont't have any contact info</p>"
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

function filters() {
    let filteredArray = [];
    let checkbox = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(function (cb) {
        return cb.value;
    })

    cleanTable();
    if (checkbox.length == 0) {
        printTeam(people);
    } else {
        for (i = 0; i < people.length; i++) {
            if (checkbox.includes(people[i].role)) {
                filteredArray.push(people[i]);
            }
        }
        printTeam(filteredArray);
    }
}

function search() {
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();

    let table = document.getElementById("table-body");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < people.length; i++) {
        if (people[i].name.toUpperCase().indexOf(filter) > -1 || people[i].contact_info.nickName.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            results++;
        } else {
            table.style.display = "";
            tr[i].style.display = "none";
        }
    }
}

function sortTable() {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("teammates");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByClassName("td-age")[0];
            y = rows[i + 1].getElementsByClassName("td-age")[0];

            if (dir == "asc") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function cleanTable() {
    let table = document.getElementById("table-body");
    for (let i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
}

function cleanModal() {
    let table = document.getElementById("modal-table");
    for (let i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i);
    }

    let avatar = document.getElementById("avatar");
    avatar.innerHTML = "";
}