#include "Commander.hpp"

void Commander::run(vector<string> args) {
  if (args.at(0) == "create") {
    string type = args.at(1);
    if (type == "character") {
      cout << "Creating character..." << endl;
    } else {
      cout << "Unknown create command!" << endl;
    }
  } else {
    cout << "GSM > '" << args.at(0) << "' command does not exist!" << endl;
  }
}