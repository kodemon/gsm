#include <iostream>
#include <string>
#include <vector>

#include "Commander.hpp"
#include "utils.hpp"

using namespace std;

int main() {
  Commander commander;

  int running = 1;
  while (running) {
    string command;

    cout << "GSM > ";
    getline(cin, command);

    if (command != "exit") {
      commander.run(split(command));
    } else {
      cout << "Goodbye!" << endl;
      running = 0;
    }
  }

  return 0;
}