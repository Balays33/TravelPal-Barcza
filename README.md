Mobile Development
Module Title: Mobile Development
Assignment Type: Individual Practical Project
Project Title: Travel Pal
Project Date: 25
th February 2019
Assignment Compiler: Amilcar Aponte
Weighting: 50%
Due Date: 28th April 2019
Method of Submission: Moodle Submission

Assignment Introduction

A company has come to you as a developer and asked you to develop a mobile application
that will work on multiple platforms. They know it is a very difficult task to install all the
different libraries and SDKs to do this, so they have told you that using a Cloud based
compiling tool is the best option.
Design and build a mobile application that will use the geolocation of your phone to show the
city and country where you are, the weather at the current location, and the currency
exchange rate to the local money.

Technologies

Adobe Phonegap – PhoneGap is a tool which allows you to write applications in HTML and
JavaScript and deploy them to any phone.
Front end JavaScript Framework – You can use any HTML/CSS/JavaScript based user
interface library such as jQuery Mobile, Framework7 or Bootstrap.
External APIs – In order to be able to access real time data, you will need to connect to
external API to request weather, currency exchange rate and name of the city/country where
you are located. You could use the APIs used in class, or explorer different options.

Specific Requirements

Start with a template source code, the following modifications should be made:

• The application should have a welcome screen that displays the name of the
city/country based on the data collected by the GPS sensor of the phone.

• A section should exist in the application that allows the user to enter in a certain
amount of USD to convert to the local currency and viseversa.
Page 2 of 3

• Another section should exist in the application to check the weather of the current
location of the user.

• Finally, there must be button for the user to save automatically the current location
and data collected from the different API’s to be retrieved later, this way the user can
keep record of places where they have been.

• This is an individual assignment.
Deliverables

• Upload a single zip file which contains:

o Source code for your application
o Document containing screenshots of your application in action, screenshots
of the Adobe cloud compiling process, and justification for your design
decisions (graphic and logic).
o Binary Android package which can be downloaded from the Adobe Cloud
website once compiled (APK file).

Extra marks

If you would like to achieve a distinction, consider to add some extra layers of
functionality, such as, but not limited to, saving a picture of the place with the record
of the visit.



# Framework7 PhoneGap Application 

> [Framework7](http://www.idangero.us/framework7) is a Mobile UI framework that can be used to build hybrid apps with PhoneGap. This template allows you to get started using Framework7 
  quickly. 
  
  For a more extensive Framework7 sample, see the [one included in their Github project](https://github.com/nolimits4web/Framework7/tree/master/dist)
  or the [demo apps on their website](http://www.idangero.us/framework7/apps/#.VpQCc5MrKjQ).
    
  Also, for an intro to Framework7, check out [this post on the PhoneGap blog](http://phonegap.com/blog/2015/11/30/framework7/).   


## Usage
    
### PhoneGap CLI

    $ phonegap create my-app --template phonegap-template-framework7

### Cordova CLI

    $ cordova create my-app --template phonegap-template-framework7
    
### Desktop

In your browser, open the file:

    /www/index.html


  