#! /usr/bin/env node

import inquirer from "inquirer";

console.log(`\n\t<<<==============================>>>`);
console.log(`\t<<===>> {'ADVENTURE GAME'} <<===>>`)
console.log(`\t\<<<==============================>>>`)


let maxEnemyHealth = 75
let enemyAttackDamage = 50
let enemiesList = [`Skeleton`, `Warrior `, `Zombie  `, `Assassin `, `Hunter `]


let health = 100
let attackDamage = 50
let totalHealthPotions = 3
let healthPotionHealAmount = 30
let healthPotionDropChance = 50 // number in persentage

let playerlevel : number = 1;

let running = true
let isRunAway = false

while (running) {
     let enemy = enemiesList[Math.floor(Math.random() * enemiesList.length)]
    let enemyHealth = Math.ceil(Math.random() * maxEnemyHealth)
    console.log(`\n\t<<<<<<<<<<<<<< ${enemy} Has Appeared >>>>>>>>>>>>>>`)

    while(enemyHealth > 0) {
        console.log(`\t#Your Health: ${health}#`)
        console.log(`\t#${enemy}'s Health: ${enemyHealth}#`)
        const { choice }: { choice: 'Attack' | 'Drink Health Potion' | 'Run' } = await inquirer.prompt([{
            name: 'choice',
            message: '\n\tWhat would you like to do?',
            type: 'list',
            choices: ['Attack', 'Drink Health Potion', 'Run',]
        }])
        if (choice === 'Attack') {
            let damageDealt = Math.ceil(Math.random() * attackDamage)
            let damageTaken = Math.ceil(Math.random() * enemyAttackDamage)

            health -= damageTaken
            enemyHealth -= damageDealt

            console.log(`\n\t#You strike the ${enemy} for ${damageDealt} damage#`)
            console.log(`\t#${enemy} damaged you for ${damageTaken}#`)
            if (health < 1) {
                break
            }
        }
        else if (choice === 'Drink Health Potion') {
            if (totalHealthPotions > 0) {

                totalHealthPotions--
                health += healthPotionHealAmount
                console.log(`\n\t#You drink a health potion, healing yourself for ${healthPotionHealAmount}#`)
                console.log(`\t#You know have ${health} Health#`)
                console.log(`\t#You have ${totalHealthPotions} health potion left#`)
            }
            else {
                console.log(`\n\t#You have 0 health potion. Defeat enemies to get a chance for one#`)
            }
        }
        else {
            console.log(`\n\t#You run away from the ${enemy}#`)
            isRunAway = true
            break;
        }
    };

    if (isRunAway) {
        isRunAway = false
        continue
    }
    if (health < 1 && enemyHealth < 1) {
        console.log(`\n\t#${enemy} dropped BOMB, You Both were killed#`)
        break
    }
    if (health < 1) {
        console.log(`\n\t#You were defeated by the ${enemy}#`)
        break;
    }

    console.log(`\t#${enemy} was defeated !!!#`)
    
    playerlevel++;
    console.log(`\t# YOUR LEVEL IS NOW ${playerlevel}#`);
    console.log(`\t#You have ${health} Health left#`)

    if (Math.ceil(Math.random() * 100) < healthPotionDropChance) {
        totalHealthPotions++
        console.log(`\n\t#The ${enemy}dropped a health potion#`)
        console.log(`\t#You now have ${totalHealthPotions} health potions#`)
    }
   
    const { choice }: { choice: 'Continue Fighting' | 'Exit' } = await inquirer.prompt([{
        name: 'choice',
        message: '\n\twhat would you like to do?',
        type: 'list',
        choices: ['Continue Fighting', 'Exit']
    }])
    if (choice === 'Continue Fighting') {
        continue
    }
    break
}

console.log(`\n\t========================================================`)
console.log(`\n\t                 Thanks For Playing !!!!!!!                 `)
console.log(`\n\t============================================================`)