# ratemyband CPSC 473 - Project 1

http://localhost:3000/

A web application which allows the registered user to rate their favorite band.

                                                         Rate My Band
Like music? Want to see the video and write the review for your favourite band? If your answers are yes, then you should surely visit our website “Rate My Band”. The website displays various local bands with different variety of genres. Initially the user needs to sign-up with the website to view the video and write the reviews. Users can choose their favourite band among the various genres. Along with the selection of their favourite band user can also read the description of the bands. The users can view the video of their favourite band posted on the website and can give a like or a dislike for the same. Other features we have added are the comment section, where the user can post their review and view the reviews of the other users.    
  
Prerequisites
Node Package Manager, Mongodb, Deployd, browser-sync.


Setup Required for Execution 
 Installation Steps:
1. For browser-sync installation use following command
			npm install -g browser-sync
2. For Deployd installation use following command
			npm install deployd-cli  -g
3. Open Node.js command prompt. Execute the following commands
			dpd create ratemyband
			cd ratemyband
		 
Steps to launch the website:
   1. The project can be easily started by cloning the repository.
Another way is to, download the zip file from the above github repository and unzip the file.
   2. Open a new command prompt change the directory to ‘Rate My Band’ folder.     
To start the server, use the following command
				dpd –open
The command will automatically open, “http://localhost:2403/ratemyband” in the browser
		
 3. Open command prompt set the path directory to where the ‘Rate My Band’ is located. 
 Start the browser-sync using the following command
browser-sync start --server --browser "Google Chrome" –files "stylesheets/*.css,scripts/*.js *.html”
(Note that Google Chrome is the recommended default browser)

Technologies Used
Client-side : HTML, JavaScript, CSS, AJAX
Server-side : Deployd

Tools Used: 
ATOM, ATOM plugins, browser-sync, eslint.

Features of Rate My Band
•	Easy registration on the website.
•	Descriptive information about the local bands.
•	Variety of genre available on the website.
•	View the uploaded video by the bands.
•	Like or dislike the video.
•	Comment on the available video.
•	Review the comments given by other members.
