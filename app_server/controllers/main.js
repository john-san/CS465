/* GET home page */
const index = (req, res) => {
	res.render("index", { title: "Travlr Getaways", activePage: "home" });
};

const rooms = (req, res) => {
	res.render("rooms", { title: "Rooms", activePage: "rooms" });
};

const meals = (req, res) => {
	res.render("meals", { title: "Meals", activePage: "meals" });
};

const news = (req, res) => {
	res.render("news", { title: "News", activePage: "news" });
};

const about = (req, res) => {
	res.render("about", { title: "About Travlr Getaways", activePage: "about" });
};

const contact = (req, res) => {
	res.render("contact", { title: "Contact Us", activePage: "contact" });
}

module.exports = {
	index,
	rooms,
	meals,
	news,
	about,
	contact,
};
