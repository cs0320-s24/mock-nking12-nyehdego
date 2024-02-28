> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

This program is an application that provides a command-promptinterface powered by CSS, HTML, and TypeScript with React. The application enables the user to switch output modes, perform various actions such as loading CSV data, viewing data, and searching through the data based on specific criteria while maintaining a history of all of the commands and outputs of those commands. Catered to a real-estate appraiser stakeholder for efficiently analyzing property values, this program will consider data to be inputted by the user.  

# Design Choices

We have a few primary files that carry the functionality of the webpage. REPLHistory is a file that handles all printing of the history array for when the user calls on specific commands. The second is REPLInput, which handles the parsing of the input by the user and passing in the proper arguments to the REPLFunciton file given the desired command. It also appends to the history log in REPLHistory based on whether we are in verbose or brief mode. The REPLFunction file is where we conduct the pushing of the proper parameters into history based on the arguments given to REPLFunction by REPLInput. This file handles the view command, load command, search command, and mode command. We have the login button as a secondary component but it doesn't have any bypass requirement that needs to be fulfilled to log in, you just have to click on it for now. The App file is the highest-level component that sets up the overall structure of the application. It renders the main components such as the REPL.

# Errors/Bugs

As of now, there are none.

# Tests

All tests of the program are present in our App.spec.ts file. It is a comprehensive check of every command after different reachable states, and various edge and error cases to test our error checking. We have tested back to back csv loading files, invalid input, malformed commands, and many different state changes/sequences and more.

# How to

To use this program, you will have to use a command line at the bottom of the application. This is where you will be able to input one of the following commands:

- `mode`: Use this command to change the format of your outputs. For ‘brief’ output: Whenever a command runs, the output displays on its own line in the history. For ‘verbose’ output: Whenever a command runs, the command is displayed alongside its output in the history window.

- `load_csv <filename>` : Use this command to load a file, of which you must load a file before you can view or search that file. In this program, acceptable files are those in the mockJson.ts file.
- `view`: Use this command to view a file that you've loaded.
- `search <column name or index number> <searchword>`: Use this command to search a file that has been loaded already. It will return all of the rows that contain the search term within the column name/index that was specified.

# Collaboration
None
