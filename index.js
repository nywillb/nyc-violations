$().ready(() => {
    $("#go").click(() => {
        alert(1);
        $.get(
            "https://data.cityofnewyork.us/resource/uvbq-3m68.json",
            {
                state: $("#state").val(),
                plate: $("#plate").val()
            },
            (data) => {
            console.log(data);
            for (const key in data) {
                var element = data[key]
                const index = (parseInt(key) + 1);
                console.log(key + " " + (parseInt(key) + 1));
                const fine = element.fine_amount;
                const precinct = element.precinct;
                const agency = element.issuing_agency;
                const borough = () => {
                    switch (element.county) {
                        case "NY": return "Manhattan";
                        case "K": return "Brooklyn";
                        case "Q": return "Queens";
                        case "BX": return "Bronx";
                        case "R": return "Staten Island";
                        default: return null;
                    }
                }
                const date = element.issue_date;
                const time = element.violation_time;
                const paid = (element.amount_due == "0" ? true : false);
                const summons = element.summons_image;
                const reason = element.violation;
                var row = $("<tr></tr>");
                row.append(makeCell(index));
                row.append(makeCell(date));
                row.append(makeCell(time));
                row.append(makeCell(precinct));
                row.append(makeCell(agency));
                row.append(makeCell(borough));
                row.append(makeCell("$" + fine));
                row.append(makeCell((paid ? "<i class=\"fas fa-check\"></i>" : "<i class=\"fas fa-times\"></i>")));
                row.append(makeCell(summons === null ? null : "<a href=\"" + summons + "\"><i class=\"far fa-image\"></i></a>"));
                row.append(makeCell(reason));
                $("#results").append(row);
            }
        });
    })
})

function makeCell(html) {
    var cell = $("<td></td>");
    cell.html(html)
    return cell;
}