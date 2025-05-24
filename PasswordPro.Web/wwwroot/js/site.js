$(document).ready(function () {
	$('table > tbody > tr > td:nth-child(6)').each(function (index, tr) {

		var jsonString = $(this).text();

		if (jsonString != "") {
			var jsonData = JSON.parse(jsonString);

			if (jsonData !== undefined || jsonData !== "" || jsonData !== null) {
				let listItem = [];
				var currentItem;
				$.each(jsonData, function (index, item) {
					currentItem = '<li>' + item.Question + ' ' + item.Answer + '</li>';
					listItem.push(currentItem)
				});

				$(this).closest('td').replaceWith(listItem);
			}		
        }	
	});
});



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
		title: 'Confirm Deletion of ID: ' + id,
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

// Question Answer
$('#QATextInput').on('click', function () {

	$("#qa").css("visibility", "visible");

	$('#addQA').off('click').on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		var questionValue = $('#questionInputField').val();
		var answerValue = $('#answerInputField').val();

		if (questionValue !== "" || answerValue !== "") {
			var removeBtn = '<button type="submit" class="removeButton">Remove</button>';
			$('#qaGrid').append('<li>' + questionValue + "    " + answerValue + removeBtn + '</li>');
			Generate();
		} else {
			alert("Both the Question and Answer fields need to be populated");
		};

	});

	$('#qa').dialog({
		autoOpen: true,
		modal: false, //grays out stuff
		title: 'Add Questions and Answers',
		height: 500,
		width: 1000,
		buttons: {
			"Save": function () { AddQuestionsAndAnswers() },
			"Cancel": function () { $(this).dialog('close'); }
		}
	});
});

$(document).on('click', '.removeButton', function () {
	$(this).parent().remove();
	Generate();
});

// Generate string
function Generate() {
	$('#jsonStringInputField').empty();

	var values = [];

	$('#qaGrid li').each(function () {
		var wordToRemove = "Remove"
		var text = $(this).text();
		text = text.replace(wordToRemove, "");

		var spacesToRemove = "    ";
		var newText = text.replace(spacesToRemove, ",")

		var question = newText.split(",")[0];
		var answer = newText.split(",")[1];

		var withBraces = `{"Question":"${question}","Answer":"${answer}"}`;

		values.push(withBraces);
	});

	var concatenatedString = values.join(",");
	var qaValue;
	if (concatenatedString != "") {
		$('#jsonStringInputField').val("[" + concatenatedString + "]");
		qaValue = $('#jsonStringInputField').val();
		$("#questionInputField").val('');
		$("#answerInputField").val('');

	}else{
		$('#jsonStringInputField').val("");
	}
}

// Add Question and Answers
function AddQuestionsAndAnswers() {
	qaValue = $('#jsonStringInputField').val();
	$('#QATextInput').val(qaValue);
	$('#qa').dialog('close');	
}

//----------------------------------------------------------------------------------------------------
// Edit

$('#EditQATextInput').on('click', function () {

	$("#editqa").css("visibility", "visible");

	if ($('#EditQATextInput').val() !== "") {
		populateTheGridWithExisting();
	}
	

	$('#EditQA').off('click').on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		var questionValue = $('#EditquestionInputField').val();
		var answerValue = $('#EditanswerInputField').val();
	
		if (questionValue !== "" || answerValue !== "") {
			var removeBtn = '<button type="submit" class="editRemoveButton">Remove</button>';
			$('#EditqaGrid').append('<li>' + questionValue + "    " + answerValue + removeBtn + '</li>');
			GenerateEdit();
		} else {			
			alert("Both the Question and Answer fields need to be populated");				
		};
	})

	$('#editqa').dialog({
		autoOpen: true,
		modal: false, //grays out stuff
		title: 'Edit Questions and Answers',
		height: 500,
		width: 1000,
		buttons: {
			"Save": function () { EditQuestionsAndAnswers() },
			"Cancel": function () { $(this).dialog('close');}
		},
		close: function () {
			$('#EditqaGrid').empty();
		}
	});
});


function GenerateEdit() {
	$('#EditjsonStringInputField').empty();

	var values = [];

	$('#EditqaGrid li').each(function () {
		var wordToRemove = "Remove"
		var text = $(this).text();
		text = text.replace(wordToRemove, "");

		var spacesToRemove = "    ";
		var newText = text.replace(spacesToRemove, ",")

		var question = newText.split(",")[0];
		var answer = newText.split(",")[1];

		var withBraces = `{"Question":"${question}","Answer":"${answer}"}`;

		values.push(withBraces);
	});

	var concatenatedString = values.join(",");
	var editValue;
	if (concatenatedString != "") {
		$('#EditjsonStringInputField').val("[" + concatenatedString + "]");
		editValue = $('#EditjsonStringInputField').val();
		$('#EditquestionInputField').val('');
		$('#EditanswerInputField').val('');
	} else {
		$('#EditjsonStringInputField').val("");
	}
}

// populate the grid with existing
function populateTheGridWithExisting() {

	var jsonString = $('#EditQATextInput').val();
	var jsonArray = JSON.parse(jsonString);
	var removeBtn = '<button type="submit" class="editRemoveButton">Remove</button>';

	$.each(jsonArray, function (index, item) {
		$('#EditqaGrid').append('<li>' + item.Question + "    " + item.Answer + removeBtn + '</li>');
	})

	$('#EditjsonStringInputField').val(jsonString);
}

function EditQuestionsAndAnswers() {
	editValue = $('#EditjsonStringInputField').val();
	$('#EditQATextInput').val(editValue);
	$('#editqa').dialog('close');
	$('#EditqaGrid').empty();
}

$(document).on('click', '.editRemoveButton', function () {
	$(this).parent().remove();
	GenerateEdit();
});