/**
 * Create a Google Form with pictures to valorate from a ID folder from drive.
 * FOLDER:
 *  - ID is part of the Drive folder URL.
 *  - Check files with mimetype JPEG, PNG, GIF, BMP.
 * FORM:
 *  - Questions are scale type from 1 to 10, "I like it nothing", "I like it the most"
 *  - Questions are separated by pagebreak to load one picture each time
 *  - Form is quiz type, one awnser per user, user can edit and shows progess
 *  - You can change Form properties and configuration later
 *
 * @author hiperfifo@gmail.com 20200504
 */
function createFormFromFolder() {
  var driveFolder = "WRITE_HERE_THE_GOOGLE_DRIVE_FOLDER_ID_WITH_IMAGES";
  /*
   * Create form
   */
  var form = FormApp.create("PHOTO CONTEST")
  form.setDescription("Form created by Folder2Form script https://github.com/hiperfifo/Folder2Form" + "\n" 
                      + "Follow given instructions and press next to start." + "\n" 
                      + "Don't forget to go final button \'Send\' to save all changes." + "\n"
                      + "Thank you for your participation.");
  form.addPageBreakItem();
  /* 
   * Get files
   */
  var folder = DriveApp.getFolderById(driveFolder);
  Logger.log("folder: " + folder.getName());
  var contents = folder.getFiles();
  /*
   * For each file, create a image type question
   * Now it's only possible to create an imageItem with and scaleItem
   */
  while (contents.hasNext()) {
    file = contents.next();
    if (file.getMimeType() == MimeType.JPEG 
        || file.getMimeType() == MimeType.PNG
        || file.getMimeType() == MimeType.BMP
        || file.getMimeType() == MimeType.GIF) {
      Logger.log("processing image: " + file.getName());
      //add image
      form.addImageItem()
        .setTitle(file.getName())
        .setHelpText(file.getDescription())
        .setImage(file.getBlob());
      //add scale
      form.addScaleItem()
        .setTitle(file.getName())
        .setHelpText("Value the image thinking of requisites and characteristics you know.")
        .setLabels("I like it nothing", "I like it the most")
        .setBounds(1, 10);  
      // add pagebreak to show just one pic per screen
      form.addPageBreakItem(); 
    }
    file = null;
  }
  /*
   * Config form
   */
  form.setCollectEmail(true);
  form.setIsQuiz(true);
  form.setLimitOneResponsePerUser(true);
  form.setRequireLogin(true);
  form.setShowLinkToRespondAgain(true);
  form.setProgressBar(true);
  //random questions just if we can use a scaleItem with an image
  form.setShuffleQuestions(false);
  //end
  Logger.log("created form with " + form.getItems().length + " questions.");
  file = null;
  contents = null;
  folder = null;
  form = null;
  drivefolder = null;
}
