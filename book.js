const form = document.getElementById("bookForm");
const message = document.getElementById("message");
const tableBody = document.querySelector("#bookTable tbody");

let books = [
    {
        id: "10001",
        name: "Dế Mèn Phiêu Lưu Ký",
        year: 1941,
        quantity: 5,
        status: true
    },
    {
        id: "20002",
        name: "Tuổi Thơ Dữ Dội",
        year: 1988,
        quantity: 0,
        status: false
    },
    {
        id: "30003",
        name: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        year: 2010,
        quantity: 3,
        status: true
    },
    {
        id: "40004",
        name: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
        year: 2008,
        quantity: 7,
        status: true
    }
];

function validateBook(book) {
    const idPattern = /^[1-5][0-9]{4}$/;
    if (!idPattern.test(book.id)) {
        return "Mã sách không hợp lệ. Phải bắt đầu bằng 1-5 và có 5 chữ số.";
    }
    if (book.name.trim() === "") {
        return "Tên sách không được để trống.";
    }
    if (book.year.toString().length !== 4) {
        return "Năm xuất bản phải là 4 chữ số.";
    }
    if (book.quantity < 0 || isNaN(book.quantity)) {
        return "Số quyển phải là số không âm.";
    }
    return null;
}

function renderBooks() {
    tableBody.innerHTML = "";
    books.forEach((book) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.name}</td>
      <td>${book.year}</td>
      <td>${book.quantity}</td>
      <td class="${book.status ? "status-true" : "status-false"}">
        ${book.status ? "Còn sách" : "Hết sách"}
      </td>
    `;
        tableBody.appendChild(row);
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const book = {
        id: document.getElementById("id").value.trim(),
        name: document.getElementById("name").value.trim(),
        year: parseInt(document.getElementById("year").value.trim()),
        quantity: parseInt(document.getElementById("quantity").value.trim()),
        status: true
    };

    const error = validateBook(book);
    if (error) {
        message.style.color = "red";
        message.textContent = error;
        return;
    }

    book.status = book.quantity > 0;
    books.push(book);
    renderBooks();
    form.reset();
    message.style.color = "green";
    message.textContent = "Thêm sách thành công!";
});

// Hiển thị sách mẫu ngay khi tải trang
renderBooks();
