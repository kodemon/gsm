import { Stratagem, TargetType } from "../Stratagem";
import { skills } from "../Skills";

export const fighter = new Stratagem([
  // {
  //   priority: 1,
  //   target: TargetType.Ally,
  //   key: "status.health.current",
  //   modifier: "<",
  //   value: 50,
  //   skill: skills.support.defend
  // },
  {
    priority: 2,
    target: TargetType.Enemy,
    key: "status.health.current",
    modifier: ">",
    value: 0,
    skill: skills.melee.slash
  }
]);
