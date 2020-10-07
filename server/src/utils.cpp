#include "utils.hpp"

vector<string> split(string str) {
  vector<string> args;

  string word = "";
  for (auto x : str) {
    if (x == ' ') {
      args.push_back(word);
      word = "";
    } else {
      word = word + x;
    }
  }
  args.push_back(word);

  return args;
}