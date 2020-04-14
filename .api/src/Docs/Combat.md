## Combat Rules

This is a very much work in progress and gathering of thoughts about game mechanics.

### Formation & Range

So that we can introduce some tactics into the mix of combat we have formations and range. Formation in this combat system is very rudimentary and is represented by a single line of combatants.

Example:

```json
{
  members: [
    "fighter",
    "rogue",
    "ranger",
    "mage"
  ]
}
```

With the above member list the fighter is at the front of the party line, and the healer is at the furthest position.

Range is reaching the positions of the members positions. For example if member line was the same
for both sides and the fighter uses a skill with range [1, 2] then the fighter can hit an enemy in either position 1 or 2. If the skill is an aoe skill then it will hit the enemy in both position 1 and 2.