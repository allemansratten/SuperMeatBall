function displayTotalPerPerson(person: string, total: number) {
    let message: string = "Total for " + person + " is " + total;
    document.getElementById("totalMessage").innerText = message;
}