# 🗡️ Text Dungeon Crawler Engine

A fully-featured text-based dungeon crawler game written in pure JavaScript. Explore randomly generated dungeons, fight monsters, collect treasure, and level up your character!

## Features

- **Procedural Generation**: Each dungeon is randomly generated with unique layouts
- **Turn-Based Combat**: Strategic combat system with attack, defense, and random damage
- **RPG Progression**: Level up system with stat increases and experience points
- **Inventory System**: Collect and use various items like potions, scrolls, and treasure
- **Multiple Room Types**: Encounter enemies, treasure chests, traps, and boss fights
- **Progressive Difficulty**: Dungeons become more challenging as you advance
- **Auto-Play Mode**: Watch the AI navigate and play the game automatically

## Quick Start

1. Run the JavaScript file in Node.js or copy-paste into browser console
2. Start your adventure:

```javascript
// Begin a new dungeon
game.startNewDungeon();

// Move around the dungeon
game.move("north");
game.move("east");

// Check your status
game.showStatus();

// View the dungeon map
game.showMap();
```

## Commands

| Command | Description |
|---------|-------------|
| `game.startNewDungeon()` | Enter a new randomly generated dungeon |
| `game.move("direction")` | Move north/south/east/west (or n/s/e/w) |
| `game.showStatus()` | Display player stats and inventory |
| `game.showMap()` | Show explored areas of current dungeon |
| `game.useItem("itemName")` | Use an item from your inventory |
| `game.help()` | Display all available commands |
| `game.autoPlay()` | Watch AI play automatically |

## Game Elements

### Room Types
- **Empty Rooms**: Safe spaces to rest and plan your next move
- **Enemy Encounters**: Fight various monsters for experience and gold
- **Treasure Chests**: Find gold, items, or bonus experience
- **Traps**: Dangerous rooms that can damage unwary adventurers
- **Boss Rooms**: Final challenge of each dungeon with powerful enemies

### Items
- **Health Potion**: Restores 30-50 HP
- **Strength Potion**: Permanently increases attack by 3
- **Defense Scroll**: Permanently increases defense by 2
- **Gold Coin**: Transforms into 25-50 gold pieces
- **Ancient Key**: Mysterious item with unknown powers

### Combat System
Combat is turn-based with damage calculations based on:
- Your attack stat vs enemy defense
- Random damage variance (1-5 points)
- Critical hits and defensive positioning

## Character Progression

- **Health**: Increases by 15-25 points per level
- **Attack**: Increases by 2-4 points per level  
- **Defense**: Increases by 1-2 points per level
- **Experience**: Required XP increases by 20% each level
- **Dungeons**: Each cleared dungeon makes future ones more challenging

## Example Gameplay

```javascript
game.startNewDungeon();
// === ENTERING NEW DUNGEON ===
// Dungeon Level: 1
// You stand at the entrance of a dark dungeon...

game.move("north");
// A wild Goblin appears!
// === COMBAT: Goblin ===
// You deal 12 damage to Goblin!
// Goblin is defeated!
// You gained 25 EXP!

game.showMap();
// --- DUNGEON MAP ---
//  ?  ?  ?  ?  ? 
//  ?  ?  ?  ?  ? 
//  ?  ?  ?  ?  ? 
//  ?  ?  ?  ?  ? 
// [P] X  ?  ?  ? 
```

## Technical Details

- **Pure JavaScript**: No external dependencies or frameworks
- **Object-Oriented Design**: Clean class structure with modular methods
- **Random Generation**: Uses Math.random() for procedural content
- **Console-Based**: All output through console.log for universal compatibility
- **Memory Efficient**: Stores only current dungeon state and player data

## Installation & Usage

### Browser Console
1. Copy the entire JavaScript code
2. Paste into browser developer console (F12)
3. Start playing with `game.startNewDungeon()`

### Node.js
1. Save code as `dungeon-crawler.js`
2. Run with `node dungeon-crawler.js`
3. Interactive commands available immediately

## Contributing

This is a single-file JavaScript project perfect for:
- Learning game development concepts
- Understanding procedural generation
- Practicing object-oriented programming
- Exploring text-based game design

Feel free to fork and expand with new features like:
- Save/load functionality
- More enemy types and items
- Skill trees and character classes
- Multiplayer elements
- ASCII art graphics

## License

Open source - feel free to use, modify, and distribute!

---