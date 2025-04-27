

$('.deleteBtn').on('click', function () {
	var name = $(this).val();
	var id = $(this).data('value')

	let myString = `<p>Are you sure you want to delete the following password? <br/ ><br /> ${name} </p>`;

	$("#confirmDelete").css({ 'visibility': 'visible' });
	$("#confirmDelete").append(myString);
	$("#confirmDelete").dialog({
		autoOpen: true,
		modal: true, //grays out stuff
		text: 'hi',
		title: 'Confirm Deletion of ID:' + id,
		height: 230,
		width: 340,
		buttons: {
			"Delete": function () { DeletePassword(id) },
			"Cancel": function () { $(this).dialog('close'); }
		},
		close: function () {
			
			location.reload();
		}
	}); 

})

function DeletePassword(id) {
	$.ajax({
		type: "POST",
		url: '/Passwords/Delete',
		data: { id: id }, 	
		async: true,
		success: function (data) {
			$("#confirmDelete").dialog('close');
		}
	});
}