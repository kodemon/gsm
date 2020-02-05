import { capitalize } from "../../../Helpers/Capitalize.ts";
import { dieRoll } from "../../../Helpers/DieRoll.ts";
import { endsWith } from "../../../Helpers/EndsWith.ts";
import { getRandomBoolean } from "../../../Helpers/GetRandomBoolean.ts";
import { isVowel } from "../../../Helpers/IsVowel.ts";
import { sample } from "../../../Helpers/Sample.ts";
import { names } from "../Resources/Names.ts";

/**
 * Gets a vile and crude name.
 *
 * @param size - Creature size.
 *
 * @returns random name.
 */
function vileAndCrude(size: "small" | "medium" | "large"): string {
  const nameArr = names.vileAndCrude[size];
  return capitalize(sample(nameArr) + sample(nameArr));
}

export class Species {
  /**
   * Gets a goblin name.
   *
   * @returns goblin name.
   */
  public goblin(): string {
    return vileAndCrude("small");
  }

  /**
   * Gets a orc name.
   *
   * @returns orc name.
   */
  public orc(): string {
    return vileAndCrude("medium");
  }

  /**
   * Gets a ogre name.
   *
   * @returns ogre name.
   */
  public ogre(): string {
    return vileAndCrude("large");
  }

  /**
   * Gets a cave person name.
   *
   * @param gender - Gender of the cave person.
   *
   * @returns cave person name.
   */
  public cavePerson(gender: "male" | "female"): string {
    const nameArr = names.primitive;
    const roll = dieRoll(10);

    let name = capitalize(sample(nameArr.names));

    switch (gender) {
      case "male": {
        if (roll > 3) {
          name = `${name}-${capitalize(sample(nameArr.names))}`;
        }
        if (roll > 8) {
          name = `${name}-${capitalize(sample(nameArr.names))}`;
        }
        break;
      }
      case "female": {
        if (roll > 5) {
          name = `${name}-${capitalize(sample(nameArr.names))}`;
        }
        name = `${name}-${capitalize(sample(nameArr.suffixes))}`;
        break;
      }
    }

    return name;
  }

  /**
   * Gets a dwarf name.
   *
   * @param gender - Gender of the dwarf.
   *
   * @returns dwarf name.
   */
  public dwarf(gender: "male" | "female"): string {
    const nameArr = names.doughty;
    const roll = dieRoll(10);

    let name = capitalize(sample(nameArr.syllables));

    switch (gender) {
      case "male": {
        if (roll > 7) {
          name = `${name}${isVowel(name.slice(-1)) ? "r" : "i"}`;
        } else {
          name = `${name}${sample(nameArr.maleSuffixes)}`;
        }
        break;
      }
      case "female": {
        if (roll > 7) {
          name = `${name}${isVowel(name.slice(-1)) ? "ra" : "a"}`;
        } else {
          name = `${name}${sample(nameArr.femaleSuffixes)}`;
        }
        break;
      }
    }

    return name;
  }

  /**
   * Gets a halfling name.
   *
   * @param gender - Gender of the halfling.
   *
   * @returns halfling name.
   */
  public halfling(gender: "male" | "female"): string {
    const nameArr = names.homely;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";
    const roll = dieRoll(10);

    let name = `${capitalize(sample(nameArr.syllables))}${sample(nameArr[suffix])}`;
    if (roll > 6) {
      name = `${name} ${sample(names.familyName.english)}`;
    }
    return name;
  }

  /**
   * Gets a gnome name.
   *
   * @param gender - Gender of the gnome.
   *
   * @returns gnome name.
   */
  public gnome(gender: "male" | "female"): string {
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";
    const roll = dieRoll(10);

    let name = `${capitalize(sample(names.doughty.syllables))}${sample(names.homely[suffix])}`;
    if (roll > 6) {
      name = `${name} ${sample(names.familyName.scottish)}`;
    }
    return name;
  }

  /**
   * Gets a elven name.
   *
   * @param gender - Gender of the elf.
   *
   * @returns elven name.
   */
  public elf(gender: "male" | "female") {
    const nameArr = names.fairAndNoble;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";

    return `${capitalize(sample(nameArr.elfPrefixes))}${sample(nameArr.middle)}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a high elf.
   *
   * @param gender - Gender of the high elf.
   *
   * @returns high elf name.
   */
  public highElf(gender: "male" | "female"): string {
    const nameArr = names.fairAndNoble;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";

    return `${capitalize(sample(nameArr.alternativeElfPrefixes))}${sample(nameArr.middle)}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a fairy name.
   *
   * @param gender - Gender of the fairy.
   *
   * @returns fairy name.
   */
  public fairy(gender: "male" | "female"): string {
    const nameArr = names.fairy;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";

    return `${capitalize(sample(nameArr.prefixes))}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a high fairy name.
   *
   * @param gender - Gender of the high fairy.
   *
   * @returns high fairy name.
   */
  public highFairy(gender: "male" | "female"): string {
    const nameArr = names.alternateFairy;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";

    return `${capitalize(sample(nameArr.prefixes))}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a dark elf name.
   *
   * @param gender - Gender of the dark elf.
   *
   * @returns dark elf name.
   */
  public darkElf(gender: "male" | "female"): string {
    const nameArr = names.elegantEvil;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";
    const roll = dieRoll(10);

    let name = capitalize(sample(nameArr.prefixesDarkElves));
    if (roll > 2) {
      name = `${name}${sample(nameArr.middle)}`;
    }
    return `${name}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a drow name.
   *
   * @param gender - Gender of the drow.
   *
   * @returns drow name.
   */
  public drow(gender: "male" | "female"): string {
    const nameArr = names.elegantEvil;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";
    const roll = dieRoll(10);

    let name = capitalize(sample(nameArr.prefixesAlternateDarkElves));
    if (roll > 2) {
      name = `${name}${sample(nameArr.middle)}`;
    }
    return `${name}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a half demon name.
   *
   * @param gender - Gender of the half demon.
   *
   * @returns half demon name.
   */
  public halfDemon(gender: "male" | "female"): string {
    const nameArr = names.malevolent;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";

    return `${capitalize(sample(nameArr.prefixes))}${sample(nameArr[suffix])}`;
  }

  /**
   * Gets a demon name.
   *
   * @param gender - Gender of the demon.
   *
   * @returns demon name.
   */
  public demon(): string {
    const keys: ["softs", "dulls", "sharps"] = ["softs", "dulls", "sharps"];
    const roll = dieRoll(3) - 1;
    const roll2 = dieRoll(2) - 1;

    const chosen = keys[roll];
    const chosen2 = keys.filter(x => x !== chosen)[roll2];

    return `${capitalize(sample(names.infernal[chosen]))}${sample(names.infernal[chosen2])}`;
  }

  /**
   * Gets a dragon name.
   *
   * @param gender - Gender of the dragon.
   *
   * @returns dragon name.
   */
  public dragon(gender: "male" | "female"): string {
    const nameArr = names.draconic;

    let name = capitalize(sample(nameArr.prefixes));
    let suffix = sample(nameArr.suffixes);

    if (gender === "female") {
      if (suffix === "bazius") suffix = "bazia";
      else if (endsWith(suffix, "os")) suffix += "sa";
      else suffix = "is";
    }

    return name + suffix;
  }

  /**
   * Gets a angel name.
   *
   * @param gender - Gender of the angel.
   *
   * @returns angel name.
   */
  public angel(gender: "male" | "female"): string {
    const nameArr = names.empyreal;
    const suffix = gender === "male" ? "maleSuffixes" : "femaleSuffixes";
    const roll = dieRoll(12);

    let name = capitalize(sample(nameArr.prefixes));

    if (roll === 1) {
      if (gender === "female") {
        const aIndex = name.lastIndexOf("a");
        name = name.substr(0, aIndex) + "e" + name.substr(aIndex + 1);
      }
      name = `${capitalize(sample(nameArr.titles))}${name}`;
    } else {
      name = `${name}${sample(nameArr[suffix])}`;
    }

    return name;
  }

  /**
   * Gets a human name.
   *
   * @param gender - Gender of the human.
   *
   * @returns human name.
   */
  public human(gender: "male" | "female" = sample(["male", "female"]), allowMultipleNames = getRandomBoolean()): string {
    if (allowMultipleNames) {
      return `${sample(names.human[gender])} ${sample(names.familyName[sample(["english", "scottish"])])}`;
    }
    return sample(names.human[gender]);
  }
}
