/* eslint-disable no-console */

import fs from "fs";

import { isSuperset } from "../lib/utils";

const WORD_LIST_FP: string = "./src/assets/words/word-list.json";
const GAME_LIST_FP: string = "./src/assets/words/game-list.json";

const MIN_LETTERS = 2;
const MAX_LETTERS = 7;
const MIN_WORD_COUNT: number = 20;
const MAX_WORD_SIZE: number = 5;

const RAW_WORDS_URL: string = "https://raw.githubusercontent.com/wordnik/wordlist/main/wordlist-20210729.txt";

function isWordValid(word: string): boolean {
  if (word.length < MIN_LETTERS || word.length > MAX_LETTERS) {
    return false;
  }

  const unique: Set<string> = new Set();
  for (const letter of word) {
    if (unique.has(letter)) {
      return false;
    }
    unique.add(letter);
  }
  return true;
}

async function makeWordList(): Promise<string[]> {
  console.log("Downloading words from", RAW_WORDS_URL);
  const url = new URL(RAW_WORDS_URL);
  const response = await (await fetch(url)).text();
  const allWords = response.split(/\r\n|\r|\n/u);

  const validWords = [];
  for (let word of allWords) {
    word = word.replace(/"/gu, "").trim().toUpperCase();
    if (isWordValid(word)) {
      validWords.push(word);
    }
  }

  console.log(`Found ${validWords.length}/${allWords.length} valid words`);
  return validWords;
}

function makePossibleGames(validWords: string[]): string[] {
  console.log("Computing all possible games");
  const validGames: string[] = [];
  // Start each game from the letters of at least one "large" word.
  const allGames = new Set(
    validWords.filter((word) => word.length >= MAX_WORD_SIZE).map((word) => Array.from(word).sort().join("")),
  );

  for (const gameCombination of allGames) {
    const game = new Set(gameCombination);
    const count = validWords.filter((word) => isSuperset(game, word)).length;
    if (count >= MIN_WORD_COUNT) {
      validGames.push(gameCombination);
    }
  }

  console.log(`Found ${validGames.length}/${allGames.size} valid games`);
  return validGames;
}

async function main(): Promise<void> {
  const validWords = await makeWordList();
  const validGames = makePossibleGames(validWords);

  fs.writeFileSync(WORD_LIST_FP, JSON.stringify(validWords));
  console.log(`Word list written to ${WORD_LIST_FP}`);

  fs.writeFileSync(GAME_LIST_FP, JSON.stringify(validGames));
  console.log(`Game list written to ${GAME_LIST_FP}`);
}

main();
