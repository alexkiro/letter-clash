/* eslint-disable no-console */

import fs from "fs";

import { combinations, isSuperset } from "../lib/utils";

const WORD_LIST_FP: string = "./src/assets/words/word-list.json";
const GAME_LIST_FP: string = "./src/assets/words/game-list.json";

const RAW_WORDS_URL: string = "https://raw.githubusercontent.com/wordnik/wordlist/main/wordlist-20210729.txt";
const ALPHABET: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
const MIN_WORDS: number = 20;

function isWordValid(word: string): boolean {
  if (word.length > 5 || word.length < 2) {
    return false;
  }

  const unique = new Set();
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
    word = word.replace(/"/gu, "").trim();
    if (isWordValid(word)) {
      validWords.push(word);
    }
  }

  console.log(`Found ${validWords.length}/${allWords.length} valid words`);
  return validWords;
}

function makePossibleGames(validWords: string[]): string[] {
  console.log("Computing all possible games");
  const allGames = Array.from(combinations(ALPHABET, 5));
  const validGames: string[] = [];

  for (const gameCombination of allGames) {
    const game = new Set(gameCombination);
    const count = validWords.filter((word) => isSuperset(game, word)).length;
    if (count >= MIN_WORDS) {
      validGames.push(gameCombination.join(""));
    }
  }

  console.log(`Found ${validGames.length}/${allGames.length} valid games`);
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
