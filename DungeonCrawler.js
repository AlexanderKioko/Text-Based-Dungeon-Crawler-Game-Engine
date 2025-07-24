class DungeonCrawler {
    constructor() {
        this.player = {
            name: 'Hero',
            health: 100,
            maxHealth: 100,
            attack: 15,
            defense: 5,
            level: 1,
            exp: 0,
            expToNext: 100,
            gold: 50,
            inventory: ['Health Potion', 'Health Potion'],
            position: { x: 0, y: 0 },
            dungeonsCleared: 0
        };
        
        this.currentDungeon = null;
        this.gameLog = [];
        this.enemyTypes = [
            { name: 'Goblin', health: 30, attack: 8, defense: 2, exp: 25, gold: 15 },
            { name: 'Orc', health: 50, attack: 12, defense: 4, exp: 40, gold: 25 },
            { name: 'Skeleton', health: 40, attack: 10, defense: 3, exp: 35, gold: 20 },
            { name: 'Spider', health: 25, attack: 15, defense: 1, exp: 30, gold: 10 },
            { name: 'Troll', health: 80, attack: 18, defense: 8, exp: 60, gold: 40 }
        ];
        
        this.items = [
            'Health Potion', 'Strength Potion', 'Defense Scroll', 'Gold Coin', 'Ancient Key'
        ];
    }
    
    log(message) {
        this.gameLog.push(message);
        console.log(message);
    }
    
    generateDungeon(size = 5) {
        const dungeon = [];
        for (let x = 0; x < size; x++) {
            dungeon[x] = [];
            for (let y = 0; y < size; y++) {
                const rand = Math.random();
                let roomType = 'empty';
                
                if (rand < 0.3) roomType = 'enemy';
                else if (rand < 0.4) roomType = 'treasure';
                else if (rand < 0.45) roomType = 'trap';
                
                dungeon[x][y] = {
                    type: roomType,
                    visited: false,
                    enemy: roomType === 'enemy' ? this.createEnemy() : null,
                    treasure: roomType === 'treasure' ? this.generateTreasure() : null
                };
            }
        }
        
        // Ensure starting position is safe
        dungeon[0][0] = { type: 'empty', visited: true, enemy: null, treasure: null };
        
        // Place boss at the end
        dungeon[size-1][size-1] = {
            type: 'boss',
            visited: false,
            enemy: this.createBoss(),
            treasure: null
        };
        
        return dungeon;
    }
    
    createEnemy() {
        const template = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        return {
            name: template.name,
            health: template.health + Math.floor(Math.random() * 10),
            maxHealth: template.health + Math.floor(Math.random() * 10),
            attack: template.attack + Math.floor(Math.random() * 3),
            defense: template.defense,
            exp: template.exp,
            gold: template.gold + Math.floor(Math.random() * 10)
        };
    }
    
    createBoss() {
        return {
            name: 'Dungeon Lord',
            health: 120 + (this.player.dungeonsCleared * 20),
            maxHealth: 120 + (this.player.dungeonsCleared * 20),
            attack: 25 + (this.player.dungeonsCleared * 3),
            defense: 10 + this.player.dungeonsCleared,
            exp: 100 + (this.player.dungeonsCleared * 25),
            gold: 100 + (this.player.dungeonsCleared * 30)
        };
    }
    
    generateTreasure() {
        const rand = Math.random();
        if (rand < 0.4) return { type: 'gold', amount: 20 + Math.floor(Math.random() * 30) };
        if (rand < 0.8) return { type: 'item', item: this.items[Math.floor(Math.random() * this.items.length)] };
        return { type: 'experience', amount: 15 + Math.floor(Math.random() * 25) };
    }
    
    startNewDungeon() {
        this.currentDungeon = this.generateDungeon();
        this.player.position = { x: 0, y: 0 };
        this.log('\n=== ENTERING NEW DUNGEON ===');
        this.log(`Dungeon Level: ${this.player.dungeonsCleared + 1}`);
        this.log('You stand at the entrance of a dark dungeon...');
        this.showStatus();
    }
    
    showStatus() {
        this.log('\n--- STATUS ---');
        this.log(`${this.player.name} (Level ${this.player.level})`);
        this.log(`Health: ${this.player.health}/${this.player.maxHealth}`);
        this.log(`Attack: ${this.player.attack} | Defense: ${this.player.defense}`);
        this.log(`EXP: ${this.player.exp}/${this.player.expToNext} | Gold: ${this.player.gold}`);
        this.log(`Position: (${this.player.position.x}, ${this.player.position.y})`);
        this.log(`Inventory: ${this.player.inventory.join(', ') || 'Empty'}`);
    }
    
    showMap() {
        this.log('\n--- DUNGEON MAP ---');
        const size = this.currentDungeon.length;
        for (let y = size - 1; y >= 0; y--) {
            let row = '';
            for (let x = 0; x < size; x++) {
                const room = this.currentDungeon[x][y];
                if (x === this.player.position.x && y === this.player.position.y) {
                    row += '[P]';
                } else if (room.visited) {
                    switch (room.type) {
                        case 'empty': row += ' . '; break;
                        case 'enemy': row += ' X '; break;
                        case 'treasure': row += ' T '; break;
                        case 'trap': row += ' ! '; break;
                        case 'boss': row += ' B '; break;
                    }
                } else {
                    row += ' ? ';
                }
            }
            this.log(row);
        }
        this.log('P=Player, .=Empty, X=Enemy(defeated), T=Treasure, !=Trap, B=Boss, ?=Unknown');
    }
    
    move(direction) {
        if (!this.currentDungeon) {
            this.log('No active dungeon! Use startNewDungeon() first.');
            return false;
        }
        
        const { x, y } = this.player.position;
        let newX = x, newY = y;
        
        switch (direction.toLowerCase()) {
            case 'north': case 'n': newY++; break;
            case 'south': case 's': newY--; break;
            case 'east': case 'e': newX++; break;
            case 'west': case 'w': newX--; break;
            default:
                this.log('Invalid direction! Use: north/n, south/s, east/e, west/w');
                return false;
        }
        
        const size = this.currentDungeon.length;
        if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
            this.log('You cannot go that way - there is a wall!');
            return false;
        }
        
        this.player.position = { x: newX, y: newY };
        this.exploreRoom();
        return true;
    }
    
    exploreRoom() {
        const room = this.currentDungeon[this.player.position.x][this.player.position.y];
        
        if (room.visited) {
            this.log('You have been in this room before. It is now empty.');
            return;
        }
        
        room.visited = true;
        
        switch (room.type) {
            case 'empty':
                this.log('This room is empty. You hear distant echoes...');
                break;
            case 'enemy':
                this.log(`A wild ${room.enemy.name} appears!`);
                this.combat(room.enemy);
                break;
            case 'treasure':
                this.log('You found a treasure chest!');
                this.openTreasure(room.treasure);
                break;
            case 'trap':
                this.log('TRAP! You step on a pressure plate!');
                this.springTrap();
                break;
            case 'boss':
                this.log(`The ${room.enemy.name} emerges from the shadows!`);
                this.log('This is the final battle of this dungeon!');
                this.combat(room.enemy, true);
                break;
        }
    }
    
    combat(enemy, isBoss = false) {
        this.log(`\n=== COMBAT: ${enemy.name} ===`);
        this.log(`${enemy.name}: ${enemy.health}/${enemy.maxHealth} HP`);
        
        while (enemy.health > 0 && this.player.health > 0) {
            // Player attack
            const playerDamage = Math.max(1, this.player.attack - enemy.defense + Math.floor(Math.random() * 5));
            enemy.health -= playerDamage;
            this.log(`You deal ${playerDamage} damage to ${enemy.name}!`);
            
            if (enemy.health <= 0) {
                this.log(`${enemy.name} is defeated!`);
                this.gainExp(enemy.exp);
                this.player.gold += enemy.gold;
                this.log(`You gained ${enemy.gold} gold!`);
                
                if (isBoss) {
                    this.player.dungeonsCleared++;
                    this.log('\n🎉 DUNGEON CLEARED! 🎉');
                    this.log(`Dungeons cleared: ${this.player.dungeonsCleared}`);
                    this.log('You can start a new, harder dungeon with startNewDungeon()');
                }
                return;
            }
            
            // Enemy attack
            const enemyDamage = Math.max(1, enemy.attack - this.player.defense + Math.floor(Math.random() * 3));
            this.player.health -= enemyDamage;
            this.log(`${enemy.name} deals ${enemyDamage} damage to you!`);
            
            if (this.player.health <= 0) {
                this.log('\n💀 GAME OVER 💀');
                this.log('You have been defeated...');
                this.respawn();
                return;
            }
            
            this.log(`Your HP: ${this.player.health}/${this.player.maxHealth} | ${enemy.name} HP: ${enemy.health}/${enemy.maxHealth}`);
        }
    }
    
    openTreasure(treasure) {
        switch (treasure.type) {
            case 'gold':
                this.player.gold += treasure.amount;
                this.log(`You found ${treasure.amount} gold!`);
                break;
            case 'item':
                this.player.inventory.push(treasure.item);
                this.log(`You found a ${treasure.item}!`);
                break;
            case 'experience':
                this.log(`You found an ancient tome! Gained ${treasure.amount} experience!`);
                this.gainExp(treasure.amount);
                break;
        }
    }
    
    springTrap() {
        const damage = 10 + Math.floor(Math.random() * 15);
        this.player.health -= damage;
        this.log(`The trap deals ${damage} damage!`);
        
        if (this.player.health <= 0) {
            this.log('\n💀 GAME OVER 💀');
            this.log('You were killed by a trap...');
            this.respawn();
        }
    }
    
    useItem(itemName) {
        const index = this.player.inventory.indexOf(itemName);
        if (index === -1) {
            this.log(`You don't have a ${itemName}!`);
            return false;
        }
        
        this.player.inventory.splice(index, 1);
        
        switch (itemName) {
            case 'Health Potion':
                const healing = 30 + Math.floor(Math.random() * 20);
                this.player.health = Math.min(this.player.maxHealth, this.player.health + healing);
                this.log(`You drink the Health Potion and recover ${healing} HP!`);
                break;
            case 'Strength Potion':
                this.player.attack += 3;
                this.log('You feel stronger! Attack increased by 3!');
                break;
            case 'Defense Scroll':
                this.player.defense += 2;
                this.log('You read the scroll and feel more resilient! Defense increased by 2!');
                break;
            case 'Gold Coin':
                const goldAmount = 25 + Math.floor(Math.random() * 25);
                this.player.gold += goldAmount;
                this.log(`The coin multiplies into ${goldAmount} gold!`);
                break;
            case 'Ancient Key':
                this.log('You use the Ancient Key... but nothing happens here.');
                break;
            default:
                this.log(`You can't use ${itemName} right now.`);
                return false;
        }
        return true;
    }
    
    gainExp(amount) {
        this.player.exp += amount;
        this.log(`Gained ${amount} EXP!`);
        
        while (this.player.exp >= this.player.expToNext) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.player.level++;
        this.player.exp -= this.player.expToNext;
        this.player.expToNext = Math.floor(this.player.expToNext * 1.2);
        
        const healthIncrease = 15 + Math.floor(Math.random() * 10);
        const attackIncrease = 2 + Math.floor(Math.random() * 3);
        const defenseIncrease = 1 + Math.floor(Math.random() * 2);
        
        this.player.maxHealth += healthIncrease;
        this.player.health = this.player.maxHealth; // Full heal on level up
        this.player.attack += attackIncrease;
        this.player.defense += defenseIncrease;
        
        this.log(`\n🌟 LEVEL UP! You are now level ${this.player.level}! 🌟`);
        this.log(`Health: +${healthIncrease} (${this.player.maxHealth})`);
        this.log(`Attack: +${attackIncrease} (${this.player.attack})`);
        this.log(`Defense: +${defenseIncrease} (${this.player.defense})`);
        this.log('You feel refreshed! Health fully restored!');
    }
    
    respawn() {
        this.player.health = Math.floor(this.player.maxHealth * 0.5);
        this.player.gold = Math.floor(this.player.gold * 0.8);
        this.player.position = { x: 0, y: 0 };
        this.log('\nYou awaken at the dungeon entrance...');
        this.log(`Health: ${this.player.health}/${this.player.maxHealth}`);
        this.log(`Gold lost: ${Math.floor(this.player.gold * 0.2)}`);
    }
    
    // Utility methods for gameplay
    help() {
        this.log('\n=== COMMANDS ===');
        this.log('startNewDungeon() - Enter a new dungeon');
        this.log('move("direction") - Move north/south/east/west (or n/s/e/w)');
        this.log('showStatus() - Display player stats');
        this.log('showMap() - Show explored dungeon map');
        this.log('useItem("itemName") - Use an item from inventory');
        this.log('help() - Show this help menu');
        this.log('getLog() - Show recent game events');
    }
    
    getLog(count = 10) {
        const recent = this.gameLog.slice(-count);
        recent.forEach(log => console.log(log));
    }
    
    // Auto-play demo
    autoPlay(steps = 20) {
        if (!this.currentDungeon) this.startNewDungeon();
        
        const directions = ['north', 'south', 'east', 'west'];
        let stepCount = 0;
        
        const playStep = () => {
            if (stepCount >= steps || this.player.health <= 0) {
                this.log('\nAuto-play completed!');
                return;
            }
            
            const direction = directions[Math.floor(Math.random() * directions.length)];
            this.log(`\n--- Auto-move: ${direction} ---`);
            
            if (!this.move(direction)) {
                // Try a different direction if blocked
                const newDirection = directions[Math.floor(Math.random() * directions.length)];
                this.move(newDirection);
            }
            
            // Randomly use health potions when low on health
            if (this.player.health < this.player.maxHealth * 0.3 && 
                this.player.inventory.includes('Health Potion')) {
                this.useItem('Health Potion');
            }
            
            stepCount++;
            setTimeout(playStep, 1000); // 1 second delay between moves
        };
        
        playStep();
    }
}

// Initialize the game
const game = new DungeonCrawler();

// Welcome message and tutorial
console.log('🗡️  DUNGEON CRAWLER ENGINE  🏰');
console.log('=====================================');
console.log('Welcome, brave adventurer!');
console.log('');
console.log('Quick Start:');
console.log('1. game.startNewDungeon() - Begin your adventure');
console.log('2. game.move("north") - Explore the dungeon');
console.log('3. game.help() - See all commands');
console.log('4. game.autoPlay() - Watch the AI play');
console.log('');
console.log('Your goal: Clear dungeons, defeat bosses, and become stronger!');
console.log('Type game.help() for detailed commands.');

// Export for Node.js if needed
if (typeof module !== 'undefined') {
    module.exports = DungeonCrawler;
}