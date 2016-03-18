$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});

/* Save JSON file locally
var getJSON = function(data) {
	var jsonData = JSON.stringify(data);
	var blob = new Blob([jsonData], {type: "application/json"});
	var url  = URL.createObjectURL(blob);

	var a = document.createElement('a');
	a.download    = "backup.json";
	a.href        = url;
	a.textContent = "Download backup.json";

	document.getElementById('page-content-wrapper').appendChild(a);
}
*/