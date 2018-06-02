// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var plainText =document.getElementById('siteName').value;

  if(!validateForm(plainText)){
    return false;
  }

  var bookmark = {
    plainText: plainText,
    cypherText: [encryptMethod1(plainText), encryptMethod2(plainText)]
  }


  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(plainText){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].plainText == plainText){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var plainText = bookmarks[i].plainText;
    var resultMethod1 = bookmarks[i].cypherText[0];
    var resultMethod2 = bookmarks[i].cypherText[1];

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+plainText+
                                  ' <a onclick="deleteBookmark(\''+plainText+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '<h2>Result method 1: '+ resultMethod1+'</h2><br>'+'<h2>Result method 2: '+ resultMethod2+'</h2><hr>'
                                  '</div>';
  }
}

// Validate Form
function validateForm(plainText){
  if(!plainText){
    alert('Please type in some text');
    return false;
  }

  return true;
}

function encryptMethod1(plaintext){
  mapping_dict = {1:["A", "j", "S"], 
                  2:["B", "K", "T"], 
                  3:["C", "L", "U"], 
                  4:["D", "M", "V"], 
                  5:["E", "N", "W"], 
                  6:["F", "O", "X"], 
                  7:["G", "P", "Y"], 
                  8:["H", "Q", "Z"], 
                  9:["I", "R"]};
  
  plaintext = plaintext.toUpperCase();
  var numericalValue = 0;
  for (let charIndex = 0; charIndex < plaintext.length; charIndex++) {
      for (let key = 1; key < 10; key++) {
          if (mapping_dict[key].includes(plaintext.charAt(charIndex))) {
              numericalValue += key;
          }
      
      }
      
  }
  return getSingleDigit(numericalValue);

}

function encryptMethod2(plaintext){
  mapping_dict = {1:["A", "I", "j", "Q", "Y"], 
                  2:["B", "K", "R"], 
                  3:["C", "G", "L", "S"], 
                  4:["D", "M", "T"], 
                  5:["E", "H", "N", "X"], 
                  6:["U", "V", "W"], 
                  7:["O", "Z"], 
                  8:["F", "P"]};
  
  plaintext = plaintext.toUpperCase();
  var numericalValue = 0;
  for (let charIndex = 0; charIndex < plaintext.length; charIndex++) {
      for (let key = 1; key < 9; key++) {
          if (mapping_dict[key].includes(plaintext.charAt(charIndex))) {
              numericalValue += key;
          }
      
      }
      
  }
  return getSingleDigit(numericalValue);

}

function getSingleDigit(numericalValue){
  var valueAsString = numericalValue.toString();
  var singleDigit = 0;
  for (let charIndex = 0; charIndex < valueAsString.length; charIndex++) {
      singleDigit += parseInt(valueAsString.charAt(charIndex));
  }

  if(singleDigit < 10){
      return singleDigit;
  } else {
      return getSingleDigit(singleDigit);
  }
      
}
