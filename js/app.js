const customers = [
    { id: 1, name: "Jane Cooper", company: "Microsoft", phone: "(225) 555-0118", email: "jane@microsoft.com", country: "United States", active: true },
    { id: 2, name: "Floyd Miles", company: "Yahoo", phone: "(205) 555-0100", email: "floyd@yahoo.com", country: "Kiribati", active: false },
    { id: 3, name: "Ronald Richards", company: "Adobe", phone: "(302) 555-0107", email: "ronald@adobe.com", country: "Israel", active: false },
    { id: 4, name: "Marvin McKinney", company: "Tesla", phone: "(252) 555-0126", email: "marvin@tesla.com", country: "Iran", active: true },
    { id: 5, name: "Jerome Bell", company: "Google", phone: "(629) 555-0129", email: "jerome@google.com", country: "Réunion", active: true },
    { id: 6, name: "Kathryn Murphy", company: "Microsoft", phone: "(406) 555-0120", email: "kathryn@microsoft.com", country: "Curaçao", active: true },
    { id: 7, name: "Jacob Jones", company: "Yahoo", phone: "(208) 555-0112", email: "jacob@yahoo.com", country: "Brazil", active: true },
    { id: 8, name: "Kristin Watson", company: "Facebook", phone: "(704) 555-0127", email: "kristin@facebook.com", country: "Åland Islands", active: false },
];

const tbody = document.getElementById("customers-body");
const searchInput = document.getElementById("table-search");
const sortSelect = document.getElementById("sort-select");
const entriesText = document.getElementById("entries-text");
const pagination = document.getElementById("pagination");

const PAGES = [1, 2, 3, 4, 40];
let currentPage = 1;

function renderCustomers() {
    const query = searchInput.value.trim().toLowerCase();

    let list = customers.filter((c) =>
        [c.name, c.company, c.phone, c.email, c.country]
            .some((field) => field.toLowerCase().includes(query))
    );

    if (sortSelect.value === "oldest") {
        list = [...list].reverse();
    }

    if (list.length === 0) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="6">Hech narsa topilmadi</td></tr>`;
    } else {
        tbody.innerHTML = list
            .map(
                (c) => `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.company}</td>
                    <td>${c.phone}</td>
                    <td>${c.email}</td>
                    <td>${c.country}</td>
                    <td class="center">
                        <span class="status ${c.active ? "active" : "inactive"}">
                            ${c.active ? "Active" : "Inactive"}
                        </span>
                    </td>
                </tr>`
            )
            .join("");
    }

    entriesText.textContent = query
        ? `Showing data ${list.length ? 1 : 0} to ${list.length} of ${list.length} entries`
        : "Showing data 1 to 8 of 256K entries";
}

function setPage(page) {
    if (!PAGES.includes(page)) return;
    currentPage = page;

    pagination.querySelectorAll(".page-btn").forEach((btn) => {
        btn.classList.toggle("active", Number(btn.dataset.page) === currentPage);
    });
}

pagination.addEventListener("click", (e) => {
    const btn = e.target.closest(".page-btn");
    if (!btn) return;

    const value = btn.dataset.page;
    const index = PAGES.indexOf(currentPage);

    if (value === "prev") setPage(PAGES[index - 1]);
    else if (value === "next") setPage(PAGES[index + 1]);
    else setPage(Number(value));
});

searchInput.addEventListener("input", renderCustomers);
sortSelect.addEventListener("change", renderCustomers);

renderCustomers();
