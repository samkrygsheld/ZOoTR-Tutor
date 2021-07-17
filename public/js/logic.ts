/* Settings */
const childSpawn: string = 'KF Links House';
const adultSpawn: string = 'Temple of Time';
const open_forest: boolean = true;
const bombchus_in_logic: boolean = true;
const logic_grottos_without_agony: boolean = true;
const logic_mido_backflip: boolean = true;
const shuffle_scrubs: boolean = false;
const logic_lens_wasteland: boolean = false;
const logic_wasteland_crossing: boolean = false;
const logic_child_dampe_race_poh: boolean = false;
const open_door_of_time: boolean = true;
const gerudo_fortress: boolean = true;


/* State */
const age: string = 'child';
const oppositeAge: string = 'adult';
const checkStatuses = {
  queenGohma: false,
};
const inventory = {
  stonekokiri: 0,
  stonegoron: 0,
  stonezora: 0,
  medallionlight: 0,
  medallionforest: 0,
  medallionfire: 0,
  medallionwater: 0,
  medallionshadow: 0,
  medallionspirit: 0,
  slingshot: 0,
  boomerang: 0,
  sticks: 0,
  nuts: 0,
  swordKokiri: 0,
  bombs: 0,
  bombchus: 0,
  magic: 0,
  dins: 0,
  arrowsfire: 0,
  arrowslight: 0,
  bottle: 0,
  shot: 0,
  shieldDeku: 0,
  ocarina: 0,
  lullaby: 0,
  sarias: 0,
  eponas: 0,
  suns: 0,
  storms: 0,
  minuet: 0,
  bolero: 0,
  serenade: 0,
  nocturne: 0,
  requiem: 0,
  prelude: 0,
  agony: 0,
  bootsiron: 0,
  bootshover: 0,
  scale: 0,
  strength: 0,
};

const roots: string[] = [childSpawn, adultSpawn, 'prelude_warp', 'minuet_warp', 'bolero_warp', 'serenade_warp', 'nocturne_warp', 'requiem_warp'];

/* Helpers */
function isChild(): boolean {
  return age === 'child';
}

function isAdult(): boolean {
  return age === 'adult';
}

function canLeaveForest(): boolean {
  return open_forest || isAdult() || checkStatuses.queenGohma;
}

function hasExplosives(): boolean {
  return !!(inventory.bombs || (bombchus_in_logic && inventory.bombchus));
}

function canChildAttack(): boolean {
  return !!(inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordKokiri || hasExplosives() || (inventory.magic && inventory.dins));
}

function canPlantBugs(): boolean {
  return !!inventory.bottle;
}

function canOpenStormGrotto(): boolean {
  return !!((inventory.ocarina && inventory.storms) && (inventory.agony || logic_grottos_without_agony));
}

function canStunDeku(): boolean {
  return !!(isAdult() || (inventory.shieldDeku || inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordKokiri || hasExplosives() || (inventory.magic && inventory.dins) || inventory.nuts));
}

function canRideEpona(): boolean {
  // COME BACK
}

function canTriggerLACS(): boolean {
  // COME BACK
}

function canFinishGerudoFortress(): boolean {
  // COME BACK
}

function canUseProjectile(): boolean {
  // COME BACK
}

function hasBombchus(): boolean {
  // COME BACK
}


/* Regions */
interface RuleObj {
  [name: string]: () => boolean;
}
interface Region {
  regionName: string;
  scene: string;
  locations?: RuleObj;
  exits: RuleObj;
}
const regions: Region[] = [
  // Overworld.json
  {
    regionName: 'Kokiri Forest',
    scene: 'Kokiri Forest',
    locations: {
      'KF Kokiri Sword Chest': () => isChild(),
      'KF GS Know It All House': () => isChild() && canChildAttack(),
      'KF GS Bean Patch': () => !!(isChild() && inventory.bottle && canChildAttack()),
      'KF GS House of Twins': () => !!(isAdult() && inventory.shot), // (logic_adult_kokiri_gs && can_use(Hover_Boots)))
    },
    exits: {
      'KF Links House': () => true,
      'KF Midos House': () => true,
      'KF Outside Deku Tree': () => isAdult() || open_forest || (inventory.swordKokiri && inventory.shieldDeku),
      'Lost Woods': () => true,
      'LW Bridge From Forest': () => canLeaveForest(),
      'KF Storms Grotto': () => canOpenStormGrotto(),
    },
  },
  {
    regionName: 'KF Outside Deku Tree',
    scene: 'Kokiri Forest',
    exits: {
      'Deku Tree Lobby': () => isChild(),
      'Kokiri Forest': () => isAdult() || open_forest || (inventory.swordKokiri && inventory.shieldDeku),
    },
  },
  {
    regionName: 'KF Links House',
    scene: 'KF Links House',
    exits: {
      'Kokiri Forest': () => true,
    },
  },
  {
    regionName: 'KF Midos House',
    scene: 'KF Midos House',
    locations: {
      'KF Midos Top Left Chest': () => true,
      'KF Midos Top Right Chest': () => true,
      'KF Midos Bottom Left Chest': () => true,
      'KF Midos Bottom Right Chest': () => true,
    },
    exits: {
      'Kokiri Forest': () => true,
    },
  },
  {
    regionName: 'LW Forest Exit', // Going the wrong way in the woods
    scene: 'Lost Woods',
    exits: {
      'Kokiri Forest': () => true,
    },
  },
  {
    regionName: 'Lost Woods',
    scene: 'Lost Woods',
    locations: {
      'LW Skull Kid': () => isChild() && !!(inventory.ocarina && inventory.sarias),
      'LW Ocarina Memory Game': () => isChild() && !!inventory.ocarina,
      'LW Target in Woods': () => isChild() && !!inventory.slingshot,
      'LW Deku Scrub Near Bridge': () => isChild() && canStunDeku(),
      'LW GS Bean Patch Near Bridge': () => canPlantBugs() || canChildAttack(),
      // 'Bug Shrub': () => 'isChild() and can_cut_shrubs and has_bottle',
    },
    exits: {
      'LW Forest Exit': () => true,
      'GC Woods Warp': () => true, // COME BACK
      'LW Bridge': () => isAdult() && (!!inventory.bootshover || inventory.shot === 2), //" isAdult() and (can_use(Hover_Boots) or can_use(Longshot) or here(can_plant_bean) or logic_lost_woods_bridge)", COME BACK
      'Zora River': () => canLeaveForest() && !!(inventory.scale || (isAdult() && inventory.bootsiron)),
      'LW Beyond Mido': () => isChild() || logic_mido_backflip || (inventory.ocarina && inventory.sarias),
      // 'LW Near Shortcuts Grotto': 'here(canBlastOrSmash())', // COME BACK - here()
    },
  },
  {
    regionName: "LW Beyond Mido",
    scene: "Lost Woods",
    locations: {
        "LW Deku Scrub Near Deku Theater Right": () => isChild() && canStunDeku(),
        "LW Deku Scrub Near Deku Theater Left": () => isChild() && canStunDeku(),
        "LW GS Above Theater": () =>
            isAdult() &&
            (here(can_plant_bean) or
                 (logic_lost_woods_gs_bean and can_use(Hookshot) and
                 (can_use(Longshot) or can_use(Bow) or has_bombchus or can_use(Dins_Fire))))", // COME BACK
        "LW GS Bean Patch Near Theater": () => canPlantBugs() && 
            (canChildAttack() || (shuffle_scrubs === false and inventory.shielddeku))
    },
    exits: {
        "LW Forest Exit": () => true,
        "Lost Woods": isChild() || (inventory.ocarina > 0 && inventory.sarias),
        "SFM Entryway": () => true,
        "Deku Theater": () => true,
        "LW Scrubs Grotto": "here(canBlastOrSmash())" // COME BACK
    }
  },
  {
    regionName: "Lost Woods Mushroom Timeout",
    scene: "Lost Woods",
    exits: {
        "Lost Woods": () => true
    }
},
{
    regionName: "SFM Entryway",
    scene: "Sacred Forest Meadow",
    exits: {
        "LW Beyond Mido": () => true,
        "Sacred Forest Meadow": () => isAdult() || inventory.slingshot || inventory.sticks || inventory.swordkokiri || (inventory.magic && inventory.dins),
        "SFM Wolfos Grotto": () => canOpenBombGrotto()
    }
},
{
    regionName: "Sacred Forest Meadow",
    scene: "Sacred Forest Meadow",
    locations: {
        "Song from Saria": () => isChild() && inventory.questchild > 2 // COME BACK "isChild() and Zeldas_Letter",
        "Sheik in Forest": () => isAdult(),
        "SFM GS": () => isAdult() && inventory.shot
    },
    exits: {
        "SFM Entryway": () => true,
        "SFM Forest Temple Entrance Ledge": () => isAdult() && inventory.shot,
        "SFM Storms Grotto": () => canOpenStormGrotto()
    }
},
{
    regionName: "SFM Forest Temple Entrance Ledge",
    scene: "Sacred Forest Meadow",
    exits: {
        "Sacred Forest Meadow": () => true,
        "Forest Temple Lobby": () => true
    }
},
{
    regionName: "LW Bridge From Forest",
    scene: "Lost Woods",
    locations: {
        "LW Gift from Saria": () => true
    },
    exits: {
        "LW Bridge": () => true
    }
},
{
    regionName: "LW Bridge",
    scene: "Lost Woods",
    exits: {
        "Kokiri Forest": () => true,
        "Hyrule Field": () => true,
        "Lost Woods": () => isAdult() && inventory.shot > 1
    }
},
{
    regionName: "Hyrule Field",
    scene: "Hyrule Field",
    timePasses: true,
    locations: {
        "HF Ocarina of Time Item": () => isChild() && inventory.kokiri && inventory.goron && inventory.zora,
        "Song from Ocarina of Time": () => isChild() && inventory.kokiri && inventory.goron && inventory.zora,
        "Big Poe Kill": () => isAdult() && inventory.bow && inventory.eponas && inventory.bottle
    },
    exits: {
        "LW Bridge": () => true,
        "Lake Hylia": () => true,
        "Gerudo Valley": () => true,
        "Market Entrance": () => true,
        "Kakariko Village": () => true,
        "ZR Front": () => true,
        "Lon Lon Ranch": () => true,
        "HF Southeast Grotto": "here(canBlastOrSmash())", // COME BACK
        "HF Open Grotto": () => true,
        "HF Inside Fence Grotto": () => canOpenBonbGrotto(),
        "HF Cow Grotto": () => ((isAdult() && inventory.hammer) || isChild()) && canOpenBombGrotto(),
        "HF Near Market Grotto": "here(canBlastOrSmash())", // COME BACK
        "HF Near Kak Grotto": () =>  canOpenBombGrotto(),
        "HF Tektite Grotto": () => canOpenBombGrotto()
    }
},
{
    regionName: "Lake Hylia",
    scene: "Lake Hylia",
    timePasses: true,
    events: {
        "Bonooru": () => isChild() && inventory.ocarina
    },
    locations: {
        "Pierre": () => isAdult() &&  "isAdult() and Bonooru and not free_scarecrow", // COME BACK
        "LH Underwater Item": () => isChild() && inventory.scale,
        "LH Sun": () => isAdult() &&  "
            isAdult() and 
            (can_use(Distant_Scarecrow) or 'Water Temple Clear') and can_use(Bow)", // COME BACK
        "LH Freestanding PoH": () => isAdult() && (inventory.scarecrow && inventory.ocarina  ||  "
            isAdult() and (can_use(Scarecrow) or here(can_plant_bean))",// COME BACK
        "LH GS Bean Patch": () => canPlantBugs() && canChildAttack(),
        "LH GS Lab Wall": () => isChild() && (inventory.boomerang || (logic_lab_wall_gs && (inventory.sticks || inventory.swordkokiri))),
        "LH GS Small Island": () => isChild() && canChildAttack(),
        "LH GS Tree": () => isAdult() && inventory.shot > 1
    },
    exits: {
        "Hyrule Field": () => true,
        "Zoras Domain": () => isChild() && inventory.scale,
        "LH Owl Flight": () => isChild(),
        "LH Lab": () => true,
        "LH Fishing Island": "
            isChild() or can_use(Scarecrow) or
            here(can_plant_bean) or 'Water Temple Clear'", // COME BACK
        "Water Temple Lobby": () => isAdult() && inventory.shot && (inventory.bootsiron || (inventory.shot > 1 || logic_water_hookshot_entry) && inventory.scale > 1),
        "LH Grotto": () => true
    }
},
{
    regionName: "LH Fishing Island",
    scene: "Lake Hylia",
    exits: {
        "Lake Hylia": () => true,
        "LH Fishing Hole": () => true
    }
},
{
    regionName: "LH Owl Flight",
    scene: "Lake Hylia",
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "LH Lab",
    scene: "LH Lab",
    events: {
        "Eyedrops Access": () => isAdult() // COME BACK "
            isAdult() and 
            ('Eyeball Frog Access' or (Eyeball_Frog and disable_trade_revert))"
    },
    locations: {
        "LH Lab Dive": () => inventory.scale > 1 || (logic_lab_diving && isAdult() & inventory.bootsiron && inventory.shot),
        "LH GS Lab Crate": () => isAdult() && inventory.bootsiron && inventory.shot
    },
    exits: {
        "Lake Hylia": () => true
    }
},
{
    regionName: "LH Fishing Hole",
    scene: "LH Fishing Hole",
    locations: {
        "LH Child Fishing": () => isChild(),
        "LH Adult Fishing": () => isAdult()
    },
    exits: {
        "LH Fishing Island": () => true
    }
},
{
    regionName: "Gerudo Valley",
    scene: "Gerudo Valley",
    timePasses: true,
    locations: {
        "GV GS Small Bridge": () => isChild()
    },
    exits: {
        "Hyrule Field": () => true,
        "GV Upper Stream": () => true,
        "GV Crate Ledge": () => isChild() || inventory.shot > 1,
        "GV Grotto Ledge": () => true,
        "GV Fortress Side": () => isAdult() && (canRideEpona() || inventory.shot > 1 || gerudo_fortress === 'open' || //COME BACK "
            isAdult() and 
            (canRideEpona() or can_use(Longshot) or gerudo_fortress == 'open' or 'Carpenter Rescue')"
    }
},
{
    regionName: "GV Upper Stream",
    scene: "Gerudo Valley",
    timePasses: true,
    locations: {
        "GV Waterfall Freestanding PoH": () => true,
        "GV GS Bean Patch": () => canPlantBugs() && canChildAttack(),
        "GV Cow": () => isChild() && inventory.ocarina && inventory.eponas
    },
    exits: {
        "GV Lower Stream": () => true
    }
},
{
    regionName: "GV Lower Stream",
    scene: "Gerudo Valley",
    timePasses: true,
    exits: {
        "Lake Hylia": () => true
    }
},
{
    regionName: "GV Grotto Ledge",
    scene: "Gerudo Valley",
    timePasses: true,
    exits: {
        "GV Lower Stream": () => true,
        "GV Octorok Grotto": () => isAdult() && inventory.strength > 1,
        "GV Crate Ledge": () => isAdult() && inventory.shot > 1
    }
},
{
    regionName: "GV Crate Ledge",
    scene: "Gerudo Valley",
    timePasses: true,
    locations: {
        "GV Crate Freestanding PoH": () => true
    },
    exits: {
        "GV Lower Stream": () => true
    }
},
{
    regionName: "GV Fortress Side",
    scene: "Gerudo Valley",
    timePasses: true,
    events: {
        "Broken Sword Access": "isAdult() and ('Poachers Saw Access' or Poachers_Saw)"
    },
    locations: {
        "GV Chest": () => isAdult() && inventory.hammer,
        "GV GS Behind Tent": () => isAdult() && inventory.shot,
        "GV GS Pillar": () => isAdult() && inventory.shot
    },
    exits: {
        "Gerudo Fortress": () => true,
        "GV Upper Stream": () => true,
        "GV Crate Ledge": "
            logic_valley_crate_hovers and can_use(Hover_Boots) and can_take_damage",
        "Gerudo Valley": () => isChild() || canRideEpona() || (isAdult() && inventory.shot > 1) ||
            gerudo_fortress === 'open' || checks.carpenter_rescue,
        "GV Carpenter Tent": isAdult(),
        "GV Storms Grotto": () => isAdult() && canOpenStormGrotto()
    }
},
{
    regionName: "GV Carpenter Tent",
    scene: "GV Carpenter Tent",
    exits: {
        "GV Fortress Side": () => true
    }
},
{
    regionName: "Gerudo Fortress",
    scene: "Gerudo Fortress",
    events: {
        "Carpenter Rescue": () => canFinishGerudoFortress(),
        "GF Gate Open": () => isAdult() && inventory.gerudocard
    },
    locations: {
        "GF Chest": "
            can_use(Hover_Boots) or can_use(Scarecrow) or can_use(Longshot)", // COME BACK - can_use(Scarecrow)
        "GF HBA 1000 Points": () => inventory.gerudocard && canRideEpona() && inventory.bow,
        "GF HBA 1500 Points": () => inventory.gerudocard && canRideEpona() && inventory.bow,
        "GF North F1 Carpenter": () => isAdult() || inventory.swordkokiri,
        "GF North F2 Carpenter": () => (isAdult() || inventory.swordkokiri) && (inventory.gerudocard || logic_gerudo_kitchen || (isAdult() && (inventory.bow || inventory.shot || inventory.bootshover))),
        "GF South F1 Carpenter": () => isAdult() || inventory.swordkokiri,
        "GF South F2 Carpenter": () => isAdult() || inventory.swordkokiri,
        "GF Gerudo Membership Card": () => canFinishGerudoFortress(),
        "GF GS Archery Range": () => isAdult() && inventory.shot && inventory.gerudocard,
        "GF GS Top Floor": () => isAdult() && (inventory.gerudocard || inventory.bow || inventory.shot || inventory.bootshover || logic_gerudo_kitchen)
    },
    exits: {
        "GV Fortress Side": () => true,
        "GF Outside Gate": "'GF Gate Open'",
        "Gerudo Training Grounds Lobby": () => inventory.gerudocard && isAdult(),
        "GF Storms Grotto": () => isAdult() && canOpenStormGrotto()
    }
},
{
    regionName: "GF Outside Gate",
    scene: "Gerudo Fortress",
    exits: {
        "Gerudo Fortress": "isAdult() or (shuffle_overworld_entrances and 'GF Gate Open')",
        "Wasteland Near Fortress": () => true
    }
},
{
    regionName: "Wasteland Near Fortress",
    scene: "Haunted Wasteland",
    exits: {
        "GF Outside Gate": () => true,
        "Haunted Wasteland": () => logic_wasteland_crossing || (isAdult() && (inventory.bootshover || inventory.shot > 1))
    }
},
{
    regionName: "Haunted Wasteland",
    scene: "Haunted Wasteland",
    locations: {
        "Wasteland Chest": () => hasFireSource(),
        "Wasteland Bombchu Salesman": () => inventory.wallet || (isAdult() || inventory.sticks || inventory.swordkokiri),
        "Wasteland GS": () => (isAdult() && inventory.shot) || (isChild() && inventory.boomerang)
    },
    exits: {
        "Wasteland Near Colossus": logic_lens_wasteland || (inventory.magic && inventory.lens),
        "Wasteland Near Fortress": logic_wasteland_crossing || (isAdult() && (inventory.bootshover || inventory.shot > 1))
    }
},
{
    regionName: "Wasteland Near Colossus",
    scene: "Haunted Wasteland",
    exits: {
        "Desert Colossus": () => true,
        "Haunted Wasteland": "logic_reverse_wasteland"
    }
},
{
    regionName: "Desert Colossus",
    scene: "Desert Colossus",
    timePasses: true,
    locations: {
        "Colossus Freestanding PoH": "isAdult() and here(can_plant_bean)",
        "Colossus GS Bean Patch": "canPlantBugs() and canChildAttack()",
        "Colossus GS Tree": () => isAdult() && inventory.shot,
        "Colossus GS Hill": "
            isAdult() and at_night and
                (here(can_plant_bean) or can_use(Longshot) or
                    (logic_colossus_gs and can_use(Hookshot)))"
    },
    exits: {
        "Colossus Great Fairy Fountain": () => hasExplosives(),
        "Spirit Temple Lobby": () => true,
        "Wasteland Near Colossus": () => true,
        "Colossus Grotto": "can_use(Silver_Gauntlets)"
    }
},
{
    regionName: "Desert Colossus From Spirit Lobby",
    scene: "Desert Colossus",
    locations: {
        "Sheik at Colossus": () => true
    },
    exits: {
        "Desert Colossus": () => true
    }
},
{
    regionName: "Colossus Great Fairy Fountain",
    scene: "Colossus Great Fairy Fountain",
    locations: {
        "Colossus Great Fairy Reward": () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        "Desert Colossus": () => true
    }
},
{
    regionName: "Market Entrance",
    scene: "Market Entrance",
    exits: {
        "Hyrule Field": () => true,
        "Market": () => true,
        "Market Guard House": () => true
    }
},
{
    regionName: "Market",
    scene: "Market",
    exits: {
        "Market Entrance": () => true,
        "ToT Entrance": () => true,
        "Castle Grounds": () => true,
        "Market Bazaar": () => isChild(),
        "Market Mask Shop": () => isChild(),
        "Market Shooting Gallery": () => isChild(),
        "Market Bombchu Bowling": () => isChild(),
        "Market Potion Shop": () => isChild(),
        "Market Treasure Chest Game": () => isChild(),
        "Market Back Alley": () => isChild()
    }
},
{
    regionName: "Market Back Alley",
    scene: "Market",
    exits: {
        "Market": () => true,
        "Market Bombchu Shop": () => true,
        "Market Dog Lady House": () => true,
        "Market Man in Green House": () => true
    }
},
{
    regionName: "ToT Entrance",
    scene: "ToT Entrance",
    exits: {
        "Market": () => true,
        "Temple of Time": () => true
    }
},
{
    regionName: "Temple of Time",
    scene: "Temple of Time",
    locations: {
        "ToT Light Arrows Cutscene": () => isAdult() && canTriggerLACS()
    },
    exits: {
        "ToT Entrance": () => true,
        "Beyond Door of Time": "(inventory.time && inventory.ocarina) or open_door_of_time"
    }
},
{
    regionName: "Beyond Door of Time",
    scene: "Temple of Time",
    locations: {
        "Master Sword Pedestal": () => true,
        "Sheik at Temple": "Forest_Medallion and isAdult()"
    },
    exits: {
        "Temple of Time": () => true
    }
},
{
    regionName: "Castle Grounds",
    scene: "Castle Grounds",
    exits: {
        "Market": "isChild() or at_dampe_time",
        "Hyrule Castle Grounds": () => isChild(),
        "Ganons Castle Grounds": () => isAdult()
    }
},
{
    regionName: "Hyrule Castle Grounds",
    scene: "Castle Grounds",
    timePasses: true,
    locations: {
        "HC Malon Egg": () => true,
        "HC GS Tree": () => canChildAttack()
    },
    exits: {
        "Castle Grounds": () => true,
        "HC Garden": "Weird_Egg or skip_child_zelda or (not shuffle_weird_egg)",
        "HC Great Fairy Fountain": () => hasExplosives(),
        "HC Storms Grotto": () => canOpenStormGrotto()
    }
},
{
    regionName: "HC Garden",
    scene: "Castle Grounds",
    exits: {
        "HC Garden Locations": () => true,
        "Hyrule Castle Grounds": () => true
    }
},
{
    # Directly reachable from Root in "Free Zelda" // COME BACK
    regionName: "HC Garden Locations",
    scene: "Castle Grounds",
    locations: {
        "HC Zeldas Letter": () => true,
        "Song from Impa": () => true
    }
},
{
    regionName: "HC Great Fairy Fountain",
    scene: "HC Great Fairy Fountain",
    locations: {
        "HC Great Fairy Reward": () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        "Castle Grounds": () => true
    }
},
{
    regionName: "Ganons Castle Grounds",
    scene: "Castle Grounds",
    locations: {
        "OGC GS": () => true
    },
    exits: {
        "Castle Grounds": () => true,
        "OGC Great Fairy Fountain": () => isAdult() && inventory.strength > 2,
        "Ganons Castle Lobby": "can_build_rainbow_bridge and at_dampe_time"
    }
},
{
    regionName: "OGC Great Fairy Fountain",
    scene: "OGC Great Fairy Fountain",
    locations: {
        "OGC Great Fairy Reward": () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        "Castle Grounds": () => true
    }
},
{
    regionName: "Market Guard House",
    scene: "Market Guard House",
    events: {
        "Sell Big Poe": "isAdult() and Bottle_with_Big_Poe"
    },
    locations: {
        "Market 10 Big Poes": "
            isAdult() and 
            (Big_Poe or (Bottle_with_Big_Poe, big_poe_count))",
        "Market GS Guard House": () => isChild()
    },
    exits: {
        "Market Entrance": () => true
    }
},
{
    regionName: "Market Bazaar",
    scene: "Market Bazaar",
    locations: {
        "Market Bazaar Item 1": () => true,
        "Market Bazaar Item 2": () => true,
        "Market Bazaar Item 3": () => true,
        "Market Bazaar Item 4": () => true,
        "Market Bazaar Item 5": () => true,
        "Market Bazaar Item 6": () => true,
        "Market Bazaar Item 7": () => true,
        "Market Bazaar Item 8": () => true
    },
    exits: {
        "Market": () => true
    }
},
{
    regionName: "Market Mask Shop",
    scene: "Market Mask Shop",
    events: {
        "Skull Mask": "Zeldas_Letter and (complete_mask_quest or at('Kakariko Village', isChild()))",
        "Mask of Truth": "'Skull Mask' and
            (complete_mask_quest or
            (at('Lost Woods', isChild() and (inventory.sarias && inventory.ocarina)) and
             at('Graveyard', isChild() and at_day) and
             at('Hyrule Field', isChild() and has_all_stones)))"
    },
    exits: {
        "Market": () => true
    }
},
{
    regionName: "Market Shooting Gallery",
    scene: "Market Shooting Gallery",
    locations: {
        "Market Shooting Gallery Reward": () => isChild()
    },
    exits: {
        "Market": () => true
    }
},
{
    regionName: "Market Bombchu Bowling",
    scene: "Market Bombchu Bowling",
    locations: {
        "Market Bombchu Bowling First Prize": "found_bombchus",
        "Market Bombchu Bowling Second Prize": "found_bombchus",
        "Market Bombchu Bowling Bombchus": "found_bombchus"
    },
    exits: {
        "Market": () => true
    }
},
{
    regionName: "Market Potion Shop",
    scene: "Market Potion Shop",
    locations: {
        "Market Potion Shop Item 1": () => true,
        "Market Potion Shop Item 2": () => true,
        "Market Potion Shop Item 3": () => true,
        "Market Potion Shop Item 4": () => true,
        "Market Potion Shop Item 5": () => true,
        "Market Potion Shop Item 6": () => true,
        "Market Potion Shop Item 7": () => true,
        "Market Potion Shop Item 8": () => true
    },
    exits: {
        "Market": () => true
    }
},
{
    regionName: "Market Treasure Chest Game",
    scene: "Market Treasure Chest Game",
    locations: {
        "Market Treasure Chest Game Reward": "(inventory.lens && inventory.magic)"
    },
    exits: {
        "Market": () => true
    }
},
{
    regionName: "Market Bombchu Shop",
    scene: "Market Bombchu Shop",
    locations: {
        "Market Bombchu Shop Item 1": () => true,
        "Market Bombchu Shop Item 2": () => true,
        "Market Bombchu Shop Item 3": () => true,
        "Market Bombchu Shop Item 4": () => true,
        "Market Bombchu Shop Item 5": () => true,
        "Market Bombchu Shop Item 6": () => true,
        "Market Bombchu Shop Item 7": () => true,
        "Market Bombchu Shop Item 8": () => true
    },
    exits: {
        "Market Back Alley": () => true
    }
},
{
    regionName: "Market Dog Lady House",
    scene: "Market Dog Lady House",
    locations: {
        "Market Lost Dog": "isChild() and at_night"
    },
    exits: {
        "Market Back Alley": () => true
    }
},
{
    regionName: "Market Man in Green House",
    scene: "Market Man in Green House",
    exits: {
        "Market Back Alley": () => true
    }
},
{
    regionName: "Kakariko Village",
    scene: "Kakariko Village",
    events: {
        "Cojiro Access": "isAdult() and 'Wake Up Adult Talon'",
        "Kakariko Village Gate Open": "isChild() and (Zeldas_Letter or open_kakariko == 'open')"
    },
    locations: {
        "Sheik in Kakariko": () => isAdult() && inventory.medallionforest && inventory.medallionfire && inventory.medallionwater,
        "Kak Anju as Adult": () => isAdult(),
        "Kak Anju as Child": () => isChild(),
        "Kak GS House Under Construction": () => isChild(),
        "Kak GS Skulltula House": () => isChild(),
        "Kak GS Guards House": () => isChild(),
        "Kak GS Tree": () => isChild(),
        "Kak GS Watchtower": "
            isChild() and (Slingshot or has_bombchus or 
                (logic_kakariko_tower_gs and (Sticks or Kokiri_Sword) and
                can_take_damage)) and at_night"
    },
    exits: {
        "Hyrule Field": () => true,
        "Kak Carpenter Boss House": () => true,
        "Kak House of Skulltula": () => true,
        "Kak Impas House": () => true,
        "Kak Windmill": () => true,
        "Kak Bazaar": "isAdult() and at_day",
        "Kak Shooting Gallery": "isAdult() and at_day",
        "Bottom of the Well": "
            'Drain Well' and (isChild() or shuffle_dungeon_entrances)",
        "Kak Potion Shop Front": () => true,
        "Kak Redead Grotto": () => canOpenBombGrotto(),
        "Kak Impas Ledge": "
            (isChild() and at_day) or (isAdult() and logic_visible_collisions)",
        "Kak Impas Rooftop": "
            can_use(Hookshot) or (logic_kakariko_rooftop_gs and can_use(Hover_Boots))",
        "Kak Odd Medicine Rooftop": "
            can_use(Hookshot) or 
            (logic_man_on_roof and 
                (isAdult() or at_day or Slingshot or has_bombchus or 
                    (logic_kakariko_tower_gs and (Sticks or Kokiri_Sword) and can_take_damage)))",
        "Kak Backyard": "isAdult() or at_day",
        "Graveyard": () => true,
        "Kak Behind Gate": "isAdult() or 'Kakariko Village Gate Open'"
    }
},
{
    regionName: "Kak Impas Ledge",
    scene: "Kakariko Village",
    exits: {
        "Kak Impas House Back": () => true,
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Impas Rooftop",
    scene: "Kakariko Village",
    locations: {
        "Kak GS Above Impas House": "isAdult() and at_night"
    },
    exits: {
        "Kak Impas Ledge": () => true,
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Odd Medicine Rooftop",
    scene: "Kakariko Village",
    locations: {
        "Kak Man on Roof": () => true
    },
    exits: {
        "Kakariko Village": () => true,
        "Kak Backyard": () => true
    }
},
{
    regionName: "Kak Backyard",
    scene: "Kakariko Village",
    exits: {
        "Kakariko Village": () => true,
        "Kak Open Grotto": () => true,
        "Kak Odd Medicine Building": () => isAdult(),
        "Kak Potion Shop Back": "isAdult() and at_day"
    }
},
{
    regionName: "Kak Carpenter Boss House",
    scene: "Kak Carpenter Boss House",
    events: {
        "Wake Up Adult Talon": "isAdult() and (Pocket_Egg or Pocket_Cucco)"
    },
    exits: {
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak House of Skulltula",
    scene: "Kak House of Skulltula",
    locations: {
        "Kak 10 Gold Skulltula Reward": "(Gold_Skulltula_Token, 10)",
        "Kak 20 Gold Skulltula Reward": "(Gold_Skulltula_Token, 20)",
        "Kak 30 Gold Skulltula Reward": "(Gold_Skulltula_Token, 30)",
        "Kak 40 Gold Skulltula Reward": "(Gold_Skulltula_Token, 40)",
        "Kak 50 Gold Skulltula Reward": "(Gold_Skulltula_Token, 50)"
    },
    exits: {
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Impas House",
    scene: "Kak Impas House",
    exits: {
        "Kakariko Village": () => true,
        "Kak Impas House Near Cow": () => true
    }
},
{
    regionName: "Kak Impas House Back",
    scene: "Kak Impas House",
    locations: {
        "Kak Impas House Freestanding PoH": () => true
    },
    exits: {
        "Kak Impas Ledge": () => true,
        "Kak Impas House Near Cow": () => true
    }
},
{
    regionName: "Kak Impas House Near Cow",
    locations: {
        "Kak Impas House Cow": () => inventory.ocarina && inventory.eponas
    }
},
{
    regionName: "Kak Windmill",
    scene: "Windmill and Dampes Grave",
    events: {
        "Drain Well": "isChild() and (inventory.storms && inventory.ocarina)" // COME BACK - Make this a check to get to BotW
    },
    locations: {
        "Kak Windmill Freestanding PoH": "
            can_use(Boomerang) or
            (logic_windmill_poh and isAdult()) or 'Dampes Windmill Access'",
        "Song from Windmill": () => isAdult() && inventory.ocarina
    },
    exits: {
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Bazaar",
    scene: "Kak Bazaar",
    locations: {
        "Kak Bazaar Item 1": () => true,
        "Kak Bazaar Item 2": () => true,
        "Kak Bazaar Item 3": () => true,
        "Kak Bazaar Item 4": () => true,
        "Kak Bazaar Item 5": () => true,
        "Kak Bazaar Item 6": () => true,
        "Kak Bazaar Item 7": () => true,
        "Kak Bazaar Item 8": () => true
    },
    exits: {
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Shooting Gallery",
    scene: "Kak Shooting Gallery",
    locations: {
        "Kak Shooting Gallery Reward": () => isAdult() && inventory.bow
    },
    exits: {
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Potion Shop Front",
    scene: "Kak Potion Shop Front",
    locations: {
        "Kak Potion Shop Item 1": () => isAdult(),
        "Kak Potion Shop Item 2": () => isAdult(),
        "Kak Potion Shop Item 3": () => isAdult(),
        "Kak Potion Shop Item 4": () => isAdult(),
        "Kak Potion Shop Item 5": () => isAdult(),
        "Kak Potion Shop Item 6": () => isAdult(),
        "Kak Potion Shop Item 7": () => isAdult(),
        "Kak Potion Shop Item 8": () => isAdult(),
    },
    exits: {
        "Kakariko Village": () => true,
        "Kak Potion Shop Back": () => isAdult()
    }
},
{
    regionName: "Kak Potion Shop Back",
    scene: "Kak Potion Shop Back",
    exits: {
        "Kak Backyard": () => isAdult(),
        "Kak Potion Shop Front": () => true
    }
},
{
    regionName: "Kak Odd Medicine Building",
    scene: "Kak Odd Medicine Building",
    events: {
        "Odd Potion Access": "
            isAdult() and
            ('Odd Mushroom Access' or (Odd_Mushroom and disable_trade_revert))"
    },
    exits: {
        "Kak Backyard": () => true
    }
},
{
    regionName: "Graveyard",
    scene: "Graveyard",
    locations: {
        "Graveyard Freestanding PoH": "
            (isAdult() and (here(can_plant_bean) or can_use(Longshot))) or
            (logic_graveyard_poh and can_use(Boomerang))",
        "Graveyard Dampe Gravedigging Tour": () => isChild(),
        "Graveyard GS Wall": () => isChild() && inventory.boomerang,
        "Graveyard GS Bean Patch": canPlantBugs() && canChildAttack()
    },
    exits: {
        "Graveyard Shield Grave": () => true,
        "Graveyard Composers Grave": () => inventory.lullaby && inventory.ocarina,
        "Graveyard Heart Piece Grave": () => true,
        "Graveyard Dampes Grave": () => isAdult(),
        "Graveyard Dampes House": () => true,
        "Kakariko Village": () => true
    }
},
{
    regionName: "Graveyard Shield Grave",
    scene: "Graveyard Shield Grave",
    locations: {
        "Graveyard Shield Grave Chest": () => true
    },
    exits: {
        "Graveyard": () => true
    }
},
{
    regionName: "Graveyard Heart Piece Grave",
    scene: "Graveyard Heart Piece Grave",
    locations: {
        "Graveyard Heart Piece Grave Chest": () => inventory.suns && inventory.ocarina
    },
    exits: {
        "Graveyard": () => true
    }
},
{
    regionName: "Graveyard Composers Grave",
    scene: "Graveyard Composers Grave",
    locations: {
        "Graveyard Composers Grave Chest": () => hasFireSource(),
        "Song from Composers Grave": () => isAdult() || (inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordkokiri || hasExplosives())
    },
    exits: {
        "Graveyard": () => true
    }
},
{
    regionName: "Graveyard Dampes Grave",
    scene: "Windmill and Dampes Grave",
    events: {
        "Dampes Windmill Access": () => isAdult() && inventory.time && inventory.ocarina
    },
    locations: {
        "Graveyard Hookshot Chest": () => true,
        "Graveyard Dampe Race Freestanding PoH": () => isAdult() || logic_child_dampe_race_poh
    },
    exits: {
        "Graveyard": () => true,
        "Kak Windmill": "isAdult() and (inventory.time && inventory.ocarina)"
    }
},
{
    regionName: "Graveyard Dampes House",
    scene: "Graveyard Dampes House",
    exits: {
        "Graveyard": () => true
    }
},
{
    regionName: "Graveyard Warp Pad Region",
    scene: "Graveyard",
    exits: {
        "Graveyard": () => true,
        "Shadow Temple Entryway": () => (inventory.dins && inventory.magic) || (logic_shadow_fire_arrow_entry && isAdult() && inventory.bow && inventory.arrowsfire && inventory.magic)
    }
},
{
    regionName: "Kak Behind Gate",
    scene: "Kakariko Village",
    exits: {
        "Kakariko Village": "
            isAdult() or logic_visible_collisions or 'Kakariko Village Gate Open' or open_kakariko == 'open'",
        "Death Mountain": () => true
    }
},
{
    regionName: "Death Mountain",
    scene: "Death Mountain",
    timePasses: true,
    locations: {
        "DMT Chest": "
            canBlastOrSmash() or 
            (logic_dmt_bombable and isChild() and Progressive_Strength_Upgrade)",
        "DMT Freestanding PoH": "
            can_take_damage or can_use(Hover_Boots) or
            (isAdult() and here(can_plant_bean and (hasExplosives() or Progressive_Strength_Upgrade)))",
        "DMT GS Bean Patch": "
            canPlantBugs() and canChildAttack() and
                (hasExplosives() or Progressive_Strength_Upgrade or
                (logic_dmt_soil_gs and can_use(Boomerang)))",
        "DMT GS Near Kak": "canBlastOrSmash()",
        "DMT GS Above Dodongos Cavern": "
            isAdult() and at_night and
            (can_use(Megaton_Hammer) or
                (logic_trail_gs_lower_hookshot and can_use(Hookshot)) or
                (logic_trail_gs_lower_hovers and can_use(Hover_Boots)) or
                (logic_trail_gs_lower_bean and here(can_plant_bean and (hasExplosives() or Progressive_Strength_Upgrade))))"
    },
    exits: {
        "Kak Behind Gate": () => true,
        "Goron City": () => true,
        "Death Mountain Summit": "
            here(canBlastOrSmash()) or
                (isAdult() and here(can_plant_bean and Progressive_Strength_Upgrade)) or
                (logic_dmt_climb_hovers and can_use(Hover_Boots))",
        "Dodongos Cavern Beginning": "
            hasExplosives() or Progressive_Strength_Upgrade or isAdult()",
        "DMT Storms Grotto": "canOpenStormGrotto()"
    }
},
{
    regionName: "Death Mountain Summit",
    scene: "Death Mountain",
    timePasses: true,
    events: {
        "Prescription Access": "isAdult() and ('Broken Sword Access' or Broken_Sword)"
    },
    locations: {
        "DMT Biggoron": "
            isAdult() and 
            (Claim_Check or 
                (guarantee_trade_path and 
                ('Eyedrops Access' or (Eyedrops and disable_trade_revert))))",
        "DMT GS Falling Rocks Path": () => isAdult() && (inventory.hammer || logic_trail_gs_upper)
    },
    exits: {
        "Death Mountain": () => true,
        "DMC Upper Local": () => true,
        "DMT Owl Flight": () => isChild(),
        "DMT Cow Grotto": () => canBlastOrSmash(),
        "DMT Great Fairy Fountain": () => canBlastOrSmash()
    }
},
{
    regionName: "DMT Owl Flight",
    scene: "Death Mountain",
    exits: {
        "Kak Impas Rooftop": () => true
    }
},
{
    regionName: "Goron City",
    scene: "Goron City",
    events: {
        "Goron City Child Fire": isChild() && inventory.dins && inventory.magic,
        "GC Woods Warp Open": () => canBlastOrSmash() || (inventory.dins && inventory.magic) || (isAdult() && inventory.bow) || inventory.strength || or can_use(Dins_Fire) or can_use(Bow) or 
            Progressive_Strength_Upgrade or 'Goron City Child Fire', // COME BACK - any reason to specify child fire?
        "Stop GC Rolling Goron as Adult": () => isAdult() && (inventory.strength || hasExplosives() || inventory.bow || (logic_link_goron_dins && inventory.dins && inventory.magic))
    },
    locations: {
        "GC Maze Left Chest": () => isAdult() && (inventory.hammer || inventory.strength > 1 || (logic_goron_city_leftmost && hasExplosives() && inventory.bootshover)),
        "GC Maze Center Chest": () => canBlastOrSmash() || (isAdult() && inventory.strength > 1),
        "GC Maze Right Chest": () => canBlastOrSmash() || (isAdult() && inventory.strength > 1),
        "GC Pot Freestanding PoH": "
            isChild() and 'Goron City Child Fire' and
            (Bombs or (Progressive_Strength_Upgrade and logic_goron_city_pot_with_strength) or (has_bombchus and logic_goron_city_pot))",
        "GC Rolling Goron as Child": () => isChild() && (hasExplosives() || (inventory.strength && logic_child_rolling_with_strength)),
        "GC Medigoron": () => isAdult() && inventory.wallet > 1 && (canBlastOrSmash() || inventory.strength),
        "GC Rolling Goron as Adult": "'Stop GC Rolling Goron as Adult'",
        "GC GS Boulder Maze": () => isChild() && hasExplosives(),
        "GC GS Center Platform": () => isAdult()
    },
    exits: {
        "Death Mountain": () => true,
        "GC Woods Warp": "'GC Woods Warp Open'",
        "GC Shop": "
            (isAdult() and 'Stop GC Rolling Goron as Adult') or 
            (isChild() and (hasExplosives() or Progressive_Strength_Upgrade or 'Goron City Child Fire'))",
        "GC Darunias Chamber": "
            (isAdult() and 'Stop GC Rolling Goron as Adult') or
            (isChild() and (inventory.lullaby && inventory.ocarina)),
        "GC Grotto Platform": "
            isAdult() and 
            (((inventory.time && inventory.ocarina) and 
                    ((damage_multiplier != 'ohko' and damage_multiplier != 'quadruple') or 
                        can_use(Goron_Tunic) or can_use(Longshot) or can_use(Nayrus_Love))) or 
                (can_use(Hookshot) and
                    ((damage_multiplier != 'ohko' and can_use(Goron_Tunic)) or
                        can_use(Nayrus_Love) or
                        (damage_multiplier != 'ohko' and damage_multiplier != 'quadruple' and logic_goron_grotto))))"
    }
},
{
    regionName: "GC Woods Warp",
    scene: "Goron City",
    events: {
        "GC Woods Warp Open": () => canBlastOrSmash() || (inventory.dins && inventory.magic)
    },
    exits: {
        "Goron City": () => canLeaveForest() &&  "can_leave_forest and 'GC Woods Warp Open'",
        "Lost Woods": () => true
    }
},
{
    regionName: "GC Darunias Chamber",
    scene: "Goron City",
    events: {
        "Goron City Child Fire": () => isChild() && inventory.sticks
    },
    locations: {
        "GC Darunias Joy": () => isChild() && (inventory.sarias && inventory.ocarina)
    },
    exits: {
        "Goron City": () => true,
        "DMC Lower Local": () => isAdult()
    }
},
{
    regionName: "GC Grotto Platform",
    scene: "Goron City",
    exits: {
        "GC Grotto": () => true,
        "Goron City": "
            (damage_multiplier != 'ohko' and damage_multiplier != 'quadruple') or 
            can_use(Goron_Tunic) or can_use(Nayrus_Love) or 
            ((inventory.time && inventory.ocarina) and can_use(Longshot))"
    }
},
{
    regionName: "GC Shop",
    scene: "GC Shop",
    locations: {
        "GC Shop Item 1": () => true,
        "GC Shop Item 2": () => true,
        "GC Shop Item 3": () => true,
        "GC Shop Item 4": () => true,
        "GC Shop Item 5": () => true,
        "GC Shop Item 6": () => true,
        "GC Shop Item 7": () => true,
        "GC Shop Item 8": () => true
    },
    exits: {
        "Goron City": () => true
    }
},
{
    regionName: "DMC Upper Nearby",
    scene: "Death Mountain Crater",
    exits: {
        "DMC Upper Local": "can_use(Goron_Tunic)",
        "Death Mountain Summit": () => true,
        "DMC Upper Grotto": "here(canBlastOrSmash())"
    }
},
{
    regionName: "DMC Upper Local",
    scene: "Death Mountain Crater",
    locations: {
        "DMC Wall Freestanding PoH": () => true,
        "DMC GS Crate": () => isChild() and canChildAttack()
    },
    exits: {
        "DMC Upper Nearby": () => true,
        "DMC Ladder Area Nearby": () => true,
        "DMC Central Nearby": "
            can_use(Goron_Tunic) and can_use(Longshot) and 
            ((damage_multiplier != 'ohko' and damage_multiplier != 'quadruple') or 
                (Fairy and not entrance_shuffle) or can_use(Nayrus_Love))"
    }
},
{
    regionName: "DMC Ladder Area Nearby",
    scene: "Death Mountain Crater",
    locations: {
        "DMC Deku Scrub": () => isChild() && canStunDeku()
    },
    exits: {
        "DMC Upper Nearby": () => isAdult(),
        "DMC Lower Nearby": () => isAdult() && (inventory.bootshover || (logic_crater_upper_to_lower && inventory.hammer))
    }
},
{
    regionName: "DMC Lower Nearby",
    scene: "Death Mountain Crater",
    exits: {
        "DMC Lower Local": () => isAdult() && inventory.tunicgoron,
        "GC Darunias Chamber": () => true,
        "DMC Great Fairy Fountain": () => isAdult() && inventory.hammer,
        "DMC Hammer Grotto": () => isAdult() && inventory.hammer
    }
},
{
    regionName: "DMC Lower Local",
    scene: "Death Mountain Crater",
    exits: {
        "DMC Lower Nearby": () => true,
        "DMC Ladder Area Nearby": () => true,
        "DMC Central Nearby": () => isAdult() && (inventory.bootshover || inventory.shot),
        "DMC Fire Temple Entrance": () => isAdult() && (inventory.bootshover || inventory.shot) && (logic_fewer_tunic_requirements || inventory.tunicgoron)
    }
},
{
    regionName: "DMC Central Nearby",
    scene: "Death Mountain Crater",
    locations: {
        "DMC Volcano Freestanding PoH": "
            isAdult() and
            (here(can_plant_bean) or 
                (logic_crater_bean_poh_with_hovers and Hover_Boots))",
        "Sheik in Crater": () => isAdult()
    },
    exits: {
        "DMC Central Local": () => isAdult() && inventory.tunicgoron
    }
},
{
    regionName: "DMC Central Local",
    scene: "Death Mountain Crater",
    locations: {
        "DMC GS Bean Patch": () => canPlantBugs() and canChildAttack(),
    },
    exits: {
        "DMC Central Nearby": () => true,
        "DMC Lower Nearby": "
            isAdult() and
            (can_use(Hover_Boots) or can_use(Hookshot) or here(can_plant_bean))",
        "DMC Upper Nearby": "isAdult() and here(can_plant_bean)",
        "DMC Fire Temple Entrance": "
            (isChild() and shuffle_dungeon_entrances) or
            (isAdult() and (logic_fewer_tunic_requirements or can_use(Goron_Tunic)))"
    }
},
{
    regionName: "DMC Fire Temple Entrance",
    scene: "Death Mountain Crater",
    exits: {
        "Fire Temple Lower": () => true,
        "DMC Central Nearby": () => isAdult() && inventory.tunicgoron
    }
},
{
    regionName: "DMC Great Fairy Fountain",
    scene: "DMC Great Fairy Fountain",
    locations: {
        "DMC Great Fairy Reward": () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        "DMC Lower Local": () => true
    }
},
{
    regionName: "DMT Great Fairy Fountain",
    scene: "DMT Great Fairy Fountain",
    locations: {
        "DMT Great Fairy Reward": () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        "Death Mountain Summit": () => true
    }
},
{
    regionName: "ZR Front",
    scene: "Zora River",
    timePasses: true,
    locations: {
        "ZR GS Tree": () => isChild() && canChildAttack()
    },
    exits: {
        "Zora River": () => isAdult() || hasExplosives(),
        "Hyrule Field": () => true
    }
},
{
    regionName: "Zora River",
    scene: "Zora River",
    timePasses: true,
    locations: {
        "ZR Magic Bean Salesman": () => isChild(),
        "ZR Frogs Ocarina Game": () => isChild() && inventory.lullaby && inventory.sarias && inventory.suns && inventory.eponas && inventory.time && inventory storms && inventory.ocarina,
        "ZR Frogs in the Rain": () => isChild() && (inventory.storms && inventory.ocarina),
        "ZR Near Open Grotto Freestanding PoH": () => isChild() || (isAdult() && (inventory.bootshover || logic_zora_river_lower)),
        "ZR Near Domain Freestanding PoH": () => isChild() || (isAdult() && (inventory.bootshover || logic_zora_river_upper)),
        "ZR GS Ladder": () => isChild() && canChildAttack(),
        "ZR GS Near Raised Grottos": () => isAdult() && inventory.shot,
        "ZR GS Above Bridge": () => isAdult() && inventory.shot
    },
    exits: {
        "ZR Front": () => true,
        "ZR Open Grotto": () => true,
        "Lost Woods": "can_dive or can_use(Iron_Boots)",
        "ZR Storms Grotto": "canOpenStormGrotto()",
        "ZR Behind Waterfall": "
            (inventory.lullaby && inventory.ocarina) or
            (can_use(Hover_Boots) and logic_zora_with_hovers) or
            (isChild() and logic_zora_with_cucco)"
    }
},
{
    regionName: "ZR Behind Waterfall",
    scene: "Zora River",
    exits: {
        "Zora River": () => true,
        "Zoras Domain": () => true
    }
},
{
    regionName: "ZR Top of Waterfall",
    scene: "Zora River",
    exits: {
        "Zora River": () => true
    }
},
{
    regionName: "Zoras Domain",
    scene: "Zoras Domain",
    events: {
        "King Zora Thawed": "isAdult() and Blue_Fire",
        "Eyeball Frog Access": "
            isAdult() and 'King Zora Thawed' and 
            (Eyedrops or Eyeball_Frog or Prescription or 'Prescription Access')"
    },
    locations: {
        "ZD Diving Minigame": () => isChild(),
        "ZD Chest": () => isChild() && inventory.sticks,
        "Deliver Rutos Letter": inventory.rutos && isChild() && zora_fountain != 'open'
        "ZD King Zora Thawed": "'King Zora Thawed'",
        "ZD GS Frozen Waterfall": () => isAdult() || (inventory.shot || inventory.bow || inventory.magic || logic_domain_gs)
    },
    exits: {
        "ZR Behind Waterfall": () => true,
        "Lake Hylia": () => isChild() and inventory.scale,
        "ZD Behind King Zora": "
            Deliver_Letter or zora_fountain == 'open' or
            (zora_fountain == 'adult' and isAdult())",
        "ZD Shop": () => isChild() || inventory.bluefire Blue_Fire // COME BACK
        "ZD Storms Grotto": () => canOpenStormGrotto()
    }
},
{
    regionName: "ZD Behind King Zora",
    scene: "Zoras Domain",
    exits: {
        "Zoras Domain": "
            Deliver_Letter or zora_fountain == 'open' or
            (zora_fountain == 'adult' and isAdult())",
        "Zoras Fountain": () => true
    }
},
{
    regionName: "ZD Eyeball Frog Timeout",
    scene: "Zoras Domain",
    exits: {
        "Zoras Domain": () => true
    }
},
{
    regionName: "Zoras Fountain",
    scene: "Zoras Fountain",
    locations: {
        "ZF Iceberg Freestanding PoH": () => isAdult(),
        "ZF Bottom Freestanding PoH": "
            isAdult() and Iron_Boots and (logic_fewer_tunic_requirements or can_use(Zora_Tunic))",
        "ZF GS Tree": () => isChild(),
        "ZF GS Above the Log": "can_use(Boomerang) and at_night",
        "ZF GS Hidden Cave": "
            can_use(Silver_Gauntlets) and canBlastOrSmash() and 
            can_use(Hookshot) and at_night"
    },
    exits: {
        "ZD Behind King Zora": () => true,
        "Jabu Jabus Belly Beginning": "isChild() and Fish",
        "ZF Ice Ledge": () => isAdult(),
        "ZF Great Fairy Fountain": () => hasExplosives()
    }
},
{
    regionName: "ZF Ice Ledge",
    scene: "Zoras Fountain",
    exits: {
        "Zoras Fountain": () => true,
        "Ice Cavern Beginning": () => true
    }
},
{
    regionName: "ZD Shop",
    scene: "ZD Shop",
    locations: {
        "ZD Shop Item 1": () => true,
        "ZD Shop Item 2": () => true,
        "ZD Shop Item 3": () => true,
        "ZD Shop Item 4": () => true,
        "ZD Shop Item 5": () => true,
        "ZD Shop Item 6": () => true,
        "ZD Shop Item 7": () => true,
        "ZD Shop Item 8": () => true
    },
    exits: {
        "Zoras Domain": () => true
    }
},
{
    regionName: "ZF Great Fairy Fountain",
    scene: "ZF Great Fairy Fountain",
    locations: {
        "ZF Great Fairy Reward": () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        "Zoras Fountain": () => true
    }
},
{
    regionName: "Lon Lon Ranch",
    scene: "Lon Lon Ranch",
    events: {
        "Epona": () => isAdult() && inventory.eponas && inventory.ocarina,
        "Links Cow": () => isAdult() && inventory.eponas && inventory.ocarina
    },
    locations: {
        "Song from Malon": () => isChild() && inventory.questchild > 2 && inventory.ocarina,
        "LLR GS Tree": () => isChild(),
        "LLR GS Rain Shed": () => isChild(),
        "LLR GS House Window": () => isChild() && inventory.boomerang,
        "LLR GS Back Wall": () => isChild() && inventory.boomerang
    },
    exits: {
        "Hyrule Field": () => true,
        "LLR Talons House": () => true,
        "LLR Stables": () => true,
        "LLR Tower": () => true,
        "LLR Grotto": () => isChild()
    }
},
{
    regionName: "LLR Talons House",
    scene: "LLR Talons House",
    locations: {
        "LLR Talons Chickens": () => isChild() && inventory.questchild > 2
    },
    exits: {
        "Lon Lon Ranch": () => true
    }
},
{
    regionName: "LLR Stables",
    scene: "LLR Stables",
    locations: {
        "LLR Stables Left Cow": () => inventory.eponas && inventory.ocarina,
        "LLR Stables Right Cow": () => inventory.eponas && inventory.ocarina
    },
    exits: {
        "Lon Lon Ranch": () => true
    }
},
{
    regionName: "LLR Tower",
    scene: "LLR Tower",
    locations: {
        "LLR Freestanding PoH": () => isChild(),
        "LLR Tower Left Cow": () => inventory.eponas && inventory.ocarina,
        "LLR Tower Right Cow": () => inventory.eponas && inventory.ocarina
    },
    exits: {
        "Lon Lon Ranch": () => true
    }
},
{
    regionName: "Ganons Castle Tower",
    dungeon: "Ganons Castle",
    locations: {
        "Ganons Tower Boss Key Chest": () => true,
        "Ganon": () => inventory.bosskeyganon && inventory.bow && inventory.arrowslight
    }
},
{
    regionName: "GF Storms Grotto",
    scene: "GF Storms Grotto",
    exits: {
        "Gerudo Fortress": () => true
    }
},
{
    regionName: "ZD Storms Grotto",
    scene: "ZD Storms Grotto",
    exits: {
        "Zoras Domain": () => true
    }
},
{
    regionName: "KF Storms Grotto",
    scene: "KF Storms Grotto",
    locations: {
        "KF Storms Grotto Chest": () => true
    },
    exits: {
        "Kokiri Forest": () => true
    }
},
{
    regionName: "LW Near Shortcuts Grotto",
    scene: "LW Near Shortcuts Grotto",
    locations: {
        "LW Near Shortcuts Grotto Chest": () => true
    },
    exits: {
        "Lost Woods": () => true
    }
},
{
    regionName: "Deku Theater",
    scene: "Deku Theater",
    locations: {
        "Deku Theater Skull Mask": () => isChild() && (inventory.questchild ===  "isChild() and 'Skull Mask'", // COME BACK
        "Deku Theater Mask of Truth": "isChild() and 'Mask of Truth'"
    },
    exits: {
        "LW Beyond Mido": () => true
    }
},
{
    regionName: "LW Scrubs Grotto",
    scene: "LW Scrubs Grotto",
    locations: {
        "LW Deku Scrub Grotto Rear": () => canStunDeku(),
        "LW Deku Scrub Grotto Front": () => canStunDeku()
    },
    exits: {
        "LW Beyond Mido": () => true
    }
},
{
    regionName: "SFM Storms Grotto",
    scene: "SFM Storms Grotto",
    locations: {
        "SFM Deku Scrub Grotto Rear": () => canStunDeku(),
        "SFM Deku Scrub Grotto Front": () => canStunDeku()
    },
    exits: {
        "Sacred Forest Meadow": () => true
    }
},
{
    regionName: "SFM Wolfos Grotto",
    scene: "SFM Wolfos Grotto",
    locations: {
        "SFM Wolfos Grotto Chest": () => isAdult() || inventory.slingshot || inventory.sticks || (inventory.magic && inventory.dins)
    },
    exits: {
        "SFM Entryway": () => true
    }
},
{
    regionName: "LLR Grotto",
    scene: "LLR Grotto",
    locations: {
        "LLR Deku Scrub Grotto Left": () => canStunDeku(),
        "LLR Deku Scrub Grotto Right": () => canStunDeku(),
        "LLR Deku Scrub Grotto Center": () => canStunDeku()
    },
    exits: {
        "Lon Lon Ranch": () => true
    }
},
{
    regionName: "HF Southeast Grotto",
    scene: "HF Southeast Grotto",
    locations: {
        "HF Southeast Grotto Chest": () => true
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HF Open Grotto",
    scene: "HF Open Grotto",
    locations: {
        "HF Open Grotto Chest": () => true
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HF Inside Fence Grotto",
    scene: "HF Inside Fence Grotto",
    locations: {
        "HF Deku Scrub Grotto": () => canStunDeku()
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HF Cow Grotto",
    scene: "HF Cow Grotto",
    locations: {
        "HF GS Cow Grotto": () => hasFireSource() && ((isAdult() && inventory.shot) || (isChild() && inventory.boomerang)),
        "HF Cow Grotto Cow": () => hasFireSource() && inventory.eponas && inventory.ocarina
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HF Near Market Grotto",
    scene: "HF Near Market Grotto",
    locations: {
        "HF Near Market Grotto Chest": () => true
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HF Near Kak Grotto",
    scene: "HF Near Kak Grotto",
    locations: {
        "HF GS Near Kak Grotto": () => ((isChild() && inventory.boomerang) || (isAdult() && inventory.shot))
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HF Tektite Grotto",
    scene: "HF Tektite Grotto",
    locations: {
        "HF Tektite Grotto Freestanding PoH": () => inventory.scale > 1 || (isAdult() && inventory.bootsiron)
    },
    exits: {
        "Hyrule Field": () => true
    }
},
{
    regionName: "HC Storms Grotto",
    scene: "HC Storms Grotto",
    locations: {
        "HC GS Storms Grotto": () => (canBlastOrSmash() || (isChild() && logic_castle_storms_gs)) && ((isChild() && inventory.boomerang) || (isAdult() && inventory.shot))
    },
    exits: {
        "Castle Grounds": () => true
    }
},
{
    regionName: "Kak Redead Grotto",
    scene: "Kak Redead Grotto",
    locations: {
        "Kak Redead Grotto Chest": () => isAdult() || (inventory.sticks || inventory.swordkokiri || (inventory.magic && inventory.dins))
    },
    exits: {
        "Kakariko Village": () => true
    }
},
{
    regionName: "Kak Open Grotto",
    scene: "Kak Open Grotto",
    locations: {
        "Kak Open Grotto Chest": () => true
    },
    exits: {
        "Kak Backyard": () => true
    }
},
{
    regionName: "DMT Cow Grotto",
    scene: "DMT Cow Grotto",
    locations: {
        "DMT Cow Grotto Cow": () => inventory.ocarina && intenvory eponas
    },
    exits: {
        "Death Mountain Summit": () => true
    }
},
{
    regionName: "DMT Storms Grotto",
    scene: "DMT Storms Grotto",
    locations: {
        "DMT Storms Grotto Chest": () => true
    },
    exits: {
        "Death Mountain": () => true
    }
},
{
    regionName: "GC Grotto",
    scene: "GC Grotto",
    locations: {
        "GC Deku Scrub Grotto Left": () => canStunDeku(),
        "GC Deku Scrub Grotto Right": () => canStunDeku(),
        "GC Deku Scrub Grotto Center": () => canStunDeku()
    },
    exits: {
        "GC Grotto Platform": () => true
    }
},
{
    regionName: "DMC Upper Grotto",
    scene: "DMC Upper Grotto",
    locations: {
        "DMC Upper Grotto Chest": () => true
    },
    exits: {
        "DMC Upper Local": () => true
    }
},
{
    regionName: "DMC Hammer Grotto",
    scene: "DMC Hammer Grotto",
    locations: {
        "DMC Deku Scrub Grotto Left": () => canStunDeku(),
        "DMC Deku Scrub Grotto Right": () => canStunDeku(),
        "DMC Deku Scrub Grotto Center": () => canStunDeku()
    },
    exits: {
        "DMC Lower Local": () => true
    }
},
{
    regionName: "ZR Open Grotto",
    scene: "ZR Open Grotto",
    locations: {
        "ZR Open Grotto Chest": () => true
    },
    exits: {
        "Zora River": () => true
    }
},
{
    regionName: "ZR Storms Grotto",
    scene: "ZR Storms Grotto",
    locations: {
        "ZR Deku Scrub Grotto Rear": () => canStunDeku(),
        "ZR Deku Scrub Grotto Front": () => canStunDeku()
    },
    exits: {
        "Zora River": () => true
    }
},
{
    regionName: "LH Grotto",
    scene: "LH Grotto",
    locations: {
        "LH Deku Scrub Grotto Left": () => canStunDeku(),
        "LH Deku Scrub Grotto Right": () => canStunDeku(),
        "LH Deku Scrub Grotto Center": () => canStunDeku()
    },
    exits: {
        "Lake Hylia": () => true
    }
},
{
    regionName: "Colossus Grotto",
    scene: "Colossus Grotto",
    locations: {
        "Colossus Deku Scrub Grotto Rear": () => canStunDeku(),
        "Colossus Deku Scrub Grotto Front": () => canStunDeku()
    },
    exits: {
        "Desert Colossus": () => true
    }
},
{
    regionName: "GV Octorok Grotto",
    scene: "GV Octorok Grotto",
    exits: {
        "GV Grotto Ledge": () => true
    }
},
{
    regionName: "GV Storms Grotto",
    scene: "GV Storms Grotto",
    locations: {
        "GV Deku Scrub Grotto Rear": () => canStunDeku(),
        "GV Deku Scrub Grotto Front": () => canStunDeku()
    },
    exits: {
        "GV Fortress Side": () => true
    }
},
// Bottom of the Well.json
{
        regionName: "Bottom of the Well",
        dungeon: "Bottom of the Well",
        exits: {
            "Kakariko Village": () => true,
            "Bottom of the Well Main Area" : () => canChildAttack() || inventory.nuts
        }
    },
    {
        regionName: "Bottom of the Well Main Area",
        dungeon: "Bottom of the Well",
        locations: {
            "Bottom of the Well Front Left Fake Wall Chest": logic_lens_botw || (inventory.lens && inventory.magic),
            "Bottom of the Well Front Center Bombable Chest": () => hasExplosives(),
            "Bottom of the Well Right Bottom Fake Wall Chest": () => logic_lens_botw || (inventory.lens && inventory.magic),
            "Bottom of the Well Compass Chest": () => logic_lens_botw || (inventory.lens && inventory.magic),
            "Bottom of the Well Center Skulltula Chest": () => logic_lens_botw || (inventory.lens && inventory.magic),
            "Bottom of the Well Back Left Bombable Chest": () => hasExplosives() && (logic_lens_botw || (inventory.lens && inventory magic)),
            "Bottom of the Well Freestanding Key": () => inventory.sticks || (inventory.dins && inventory.magic),
            "Bottom of the Well Lens of Truth Chest": () => (inventory.lullaby && inventory.ocarina) && (inventory.swordkokiri || (inventory.sticks && logic_child_deadhand)),
            "Bottom of the Well Invisible Chest": () => (inventory.lullaby && inventory.ocarina) && (logic_lens_botw || (inventory.lens && inventory.magic)),
            "Bottom of the Well Underwater Front Chest": () => (inventory.lullaby && inventory.ocarina),
            "Bottom of the Well Underwater Left Chest": () => (inventory.lullaby && inventory.ocarina),
            "Bottom of the Well Map Chest": "
                hasExplosives() or 
                ((((Small_Key_Bottom_of_the_Well, 3) and (logic_lens_botw or (inventory.lens && inventory.magic))) or 
                    can_use(Dins_Fire) or (logic_botw_basement and Sticks)) and 
                Progressive_Strength_Upgrade)",
            "Bottom of the Well Fire Keese Chest": "
                (Small_Key_Bottom_of_the_Well, 3) and (logic_lens_botw or (inventory.lens && inventory.magic))", #These pits are really unfair.
            "Bottom of the Well Like Like Chest": "
                (Small_Key_Bottom_of_the_Well, 3) and (logic_lens_botw or (inventory.lens && inventory.magic))",
            "Bottom of the Well GS West Inner Room": "
                Boomerang and (logic_lens_botw or (inventory.lens && inventory.magic)) and 
                (Small_Key_Bottom_of_the_Well, 3)",
            "Bottom of the Well GS East Inner Room": "
                Boomerang and (logic_lens_botw or (inventory.lens && inventory.magic)) and 
                (Small_Key_Bottom_of_the_Well, 3)",
            "Bottom of the Well GS Like Like Cage": "
                Boomerang and (logic_lens_botw or (inventory.lens && inventory.magic)) and
                (Small_Key_Bottom_of_the_Well, 3)",
            "Stick Pot": () => true,
            "Nut Pot": () => true
        },
        exits: {
            "Bottom of the Well" : () => true
        }
    },
// Deku Tree.json
    {
        regionName: "Deku Tree Lobby",
        dungeon: "Deku Tree",
        locations: {
            "Deku Tree Map Chest": () => true,
            "Deku Tree Compass Chest": () => true,
            "Deku Tree Compass Room Side Chest": () => true,
            "Deku Tree Basement Chest": "isAdult() or can_child_attack or Nuts",
            "Deku Tree GS Compass Room": "isAdult() or can_child_attack",
            "Deku Tree GS Basement Vines": "
                can_use_projectile or can_use(Dins_Fire) or
                (logic_deku_basement_gs and (isAdult() or Sticks or Kokiri_Sword))",
            "Deku Tree GS Basement Gate": "isAdult() or can_child_attack",
            "Deku Baba Sticks": "isAdult() or Kokiri_Sword or Boomerang",
            "Deku Baba Nuts": "
                isAdult() or Slingshot or Sticks or 
                hasExplosives() or Kokiri_Sword or can_use(Dins_Fire)"
        },
        exits: {
            "KF Outside Deku Tree": () => true,
            "Deku Tree Slingshot Room": "here(has_shield)",
            "Deku Tree Basement Backroom": "
                (here(has_fire_source_with_torch or can_use(Bow)) and
                    here(can_use(Slingshot) or can_use(Bow))) or
                (isChild() and (logic_deku_b1_skip or here(isAdult())))",
            "Deku Tree Boss Room": "
                here(has_fire_source_with_torch or
                     (logic_deku_b1_webs_with_bow and can_use(Bow))) and
                (logic_deku_b1_skip or here(isAdult() or can_use(Slingshot)))"
        }
    },
    {
        regionName: "Deku Tree Slingshot Room",
        dungeon: "Deku Tree",
        locations: {
            "Deku Tree Slingshot Chest": () => true,
            "Deku Tree Slingshot Room Side Chest": () => true
        },
        exits: {
            "Deku Tree Lobby": () => true
        }
    },
    {
        regionName: "Deku Tree Basement Backroom",
        dungeon: "Deku Tree",
        locations: {
            "Deku Tree GS Basement Back Room": "
                here(has_fire_source_with_torch or can_use(Bow)) and
                here(can_blast_or_smash) and
                (can_use(Boomerang) or can_use(Hookshot))"
        },
        exits: {
            "Deku Tree Lobby": () => true
        }
    },
    {
        regionName: "Deku Tree Boss Room",
        dungeon: "Deku Tree",
        events: {
            "Deku Tree Clear": "
                here(has_shield) and (isAdult() or Kokiri_Sword or Sticks)"
        },
        locations: {
            "Deku Tree Queen Gohma Heart": "
                here(has_shield) and (isAdult() or Kokiri_Sword or Sticks)",
            "Queen Gohma": "
                here(has_shield) and (isAdult() or Kokiri_Sword or Sticks)"
        },
        exits: {
            "Deku Tree Lobby": () => true
        }
    },
// Dodongos Cavern.json
    {
        regionName: "Dodongos Cavern Beginning",
        dungeon: "Dodongos Cavern",
        exits: {
            "Death Mountain": () => true,
            "Dodongos Cavern Lobby": "
                here(can_blast_or_smash or Progressive_Strength_Upgrade)"
        }
    },
    {
        regionName: "Dodongos Cavern Lobby",
        dungeon: "Dodongos Cavern",
        locations: {
            "Dodongos Cavern Map Chest": () => true,
            "Dodongos Cavern GS Side Room Near Lower Lizalfos": "
                hasExplosives() or isAdult() or Slingshot or 
                Boomerang or Sticks or Kokiri_Sword",
            "Dodongos Cavern GS Scarecrow": "
                can_use(Scarecrow) or can_use(Longshot) or 
                (logic_dc_scarecrow_gs and (isAdult() or can_child_attack))",
            "Dodongos Cavern Deku Scrub Side Room Near Dodongos": "
                isAdult() or Slingshot or Sticks or 
                hasExplosives() or Kokiri_Sword",
            "Dodongos Cavern Deku Scrub Lobby": () => true,
        },
        exits: {
            "Dodongos Cavern Beginning": () => true,
            "Dodongos Cavern Staircase Room": "
                here(isAdult() or Sticks or
                    (can_use(Dins_Fire) and (Slingshot or hasExplosives() or Kokiri_Sword)))",
            "Dodongos Cavern Far Bridge": "at('Dodongos Cavern Far Bridge', True)"
        }
    },
    {
        regionName: "Dodongos Cavern Staircase Room",
        dungeon: "Dodongos Cavern",
        locations: {
            "Dodongos Cavern Compass Chest": () => true,
            "Dodongos Cavern GS Vines Above Stairs": "
                hasExplosives() or Progressive_Strength_Upgrade or can_use(Dins_Fire) or
                (logic_dc_staircase and can_use(Bow)) or
                (logic_dc_vines_gs and can_use(Longshot))"
        },
        exits: {
            "Dodongos Cavern Lobby": () => true,
            "Dodongos Cavern Climb": "
                hasExplosives() or Progressive_Strength_Upgrade or 
                    can_use(Dins_Fire) or (logic_dc_staircase and can_use(Bow))"
        }
    },
    {
        regionName: "Dodongos Cavern Climb",
        dungeon: "Dodongos Cavern",
        locations: {
            "Dodongos Cavern Bomb Flower Platform Chest": () => true,
            "Dodongos Cavern Deku Scrub Near Bomb Bag Right": "
                can_blast_or_smash or
                (logic_dc_scrub_room and isAdult() and Progressive_Strength_Upgrade)",
            "Dodongos Cavern Deku Scrub Near Bomb Bag Left": "
                can_blast_or_smash or
                (logic_dc_scrub_room and isAdult() and Progressive_Strength_Upgrade)"
        },
        exits: {
            "Dodongos Cavern Lobby": () => true,
            "Dodongos Cavern Far Bridge": "
                (isChild() and (Slingshot or
                    (logic_dc_slingshot_skip and (Sticks or hasExplosives() or Kokiri_Sword)))) or 
                (isAdult() and (Bow or Hover_Boots or can_use(Longshot) or logic_dc_jump))"
        }
    },
    {
        regionName: "Dodongos Cavern Far Bridge",
        dungeon: "Dodongos Cavern",
        locations: {
            "Dodongos Cavern Bomb Bag Chest": () => true,
            "Dodongos Cavern End of Bridge Chest": "can_blast_or_smash",
            "Dodongos Cavern GS Alcove Above Stairs": "can_use(Hookshot) or can_use(Boomerang)"
        },
        exits: {
            "Dodongos Cavern Boss Area": () => hasExplosives(),
            "Dodongos Cavern Lobby": () => true
        }
    },
    {
        regionName: "Dodongos Cavern Boss Area",
        dungeon: "Dodongos Cavern",
        locations: {
            "Dodongos Cavern Boss Room Chest": () => true,
            "Dodongos Cavern King Dodongo Heart": "
                (Bombs or Progressive_Strength_Upgrade) and 
                (isAdult() or Sticks or Kokiri_Sword)",
            "King Dodongo": "
                (Bombs or Progressive_Strength_Upgrade) and 
                (isAdult() or Sticks or Kokiri_Sword)",
            "Dodongos Cavern GS Back Room": () => true
        },
        exits: {
            "Dodongos Cavern Lobby": () => true
        }
    },
// Fire Temple.json
    {
        regionName: "Fire Temple Lower",
        dungeon: "Fire Temple",
        locations: {
            "Fire Temple Near Boss Chest" : "
                logic_fewer_tunic_requirements or can_use(Goron_Tunic)",
            "Fire Temple Flare Dancer Chest": "
                ((Small_Key_Fire_Temple, 8) or not keysanity) and can_use(Megaton_Hammer)",
            "Fire Temple Boss Key Chest": "
                ((Small_Key_Fire_Temple, 8) or not keysanity) and can_use(Megaton_Hammer)",
            "Fire Temple Volvagia Heart": "
                can_use(Goron_Tunic) and can_use(Megaton_Hammer) and Boss_Key_Fire_Temple and 
                (logic_fire_boss_door_jump or Hover_Boots or
                    at('Fire Temple Upper', (inventory.time && inventory.ocarina) or hasExplosives()))",
            "Volvagia": "
                can_use(Goron_Tunic) and can_use(Megaton_Hammer) and Boss_Key_Fire_Temple and 
                (logic_fire_boss_door_jump or Hover_Boots or
                    at('Fire Temple Upper', (inventory.time && inventory.ocarina) or hasExplosives()))",
            "Fire Temple GS Boss Key Loop": "
                ((Small_Key_Fire_Temple, 8) or not keysanity) and can_use(Megaton_Hammer)"
        },
        exits: {
            "DMC Fire Temple Entrance": () => true,
            "Fire Temple Big Lava Room":"
                (Small_Key_Fire_Temple, 2) and
                (logic_fewer_tunic_requirements or can_use(Goron_Tunic))"
        }
    },
    {
        regionName: "Fire Temple Big Lava Room",
        dungeon: "Fire Temple",
        locations: {
            "Fire Temple Big Lava Room Lower Open Door Chest": () => true,
            "Fire Temple Big Lava Room Blocked Door Chest": "isAdult() and hasExplosives()",
            "Fire Temple GS Song of Time Room": "
                isAdult() and ((inventory.time && inventory.ocarina) or logic_fire_song_of_time)"
        },
        exits: {
            "Fire Temple Lower":  () => true,
            "Fire Temple Middle": "
                can_use(Goron_Tunic) and (Small_Key_Fire_Temple, 4) and
                (Progressive_Strength_Upgrade or logic_fire_strength) and 
                (hasExplosives() or Bow or Progressive_Hookshot)"
        }
    },
    {
        regionName: "Fire Temple Middle",
        dungeon: "Fire Temple",
        locations: {
            "Fire Temple Boulder Maze Lower Chest": () => true,
            "Fire Temple Boulder Maze Upper Chest": "(Small_Key_Fire_Temple, 6)",
            "Fire Temple Boulder Maze Side Room Chest": () => true,
            "Fire Temple Boulder Maze Shortcut Chest": "
                (Small_Key_Fire_Temple, 6) and hasExplosives()",
            "Fire Temple Scarecrow Chest": "
                (Small_Key_Fire_Temple, 6) and
                (can_use(Scarecrow) or (logic_fire_scarecrow and can_use(Longshot)))",
            "Fire Temple Map Chest": "
                (Small_Key_Fire_Temple, 6) or ((Small_Key_Fire_Temple, 5) and can_use(Bow))",
            "Fire Temple Compass Chest": "(Small_Key_Fire_Temple, 7)",
            "Fire Temple GS Boulder Maze": "(Small_Key_Fire_Temple, 4) and hasExplosives()",
            "Fire Temple GS Scarecrow Climb": "
                (Small_Key_Fire_Temple, 6) and
                (can_use(Scarecrow) or (logic_fire_scarecrow and can_use(Longshot)))",
            "Fire Temple GS Scarecrow Top": "
                (Small_Key_Fire_Temple, 6) and
                (can_use(Scarecrow) or (logic_fire_scarecrow and can_use(Longshot)))"
        },
        exits: {
            "Fire Temple Upper": "
                (Small_Key_Fire_Temple, 8) or 
                ((Small_Key_Fire_Temple, 7) and
                    ((can_use(Hover_Boots) and can_use(Megaton_Hammer)) or logic_fire_flame_maze))"
        }
    },
    {
        regionName: "Fire Temple Upper",
        dungeon: "Fire Temple",
        locations: {
            "Fire Temple Highest Goron Chest": "
                can_use(Megaton_Hammer) and 
                ((inventory.time && inventory.ocarina) or (logic_rusted_switches and 
                    (can_use(Hover_Boots) or hasExplosives())))",
            "Fire Temple Megaton Hammer Chest": () => hasExplosives()
        }
    },
// Forest Temple.json
    {
        regionName: "Forest Temple Lobby",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple First Room Chest": () => true,
            "Forest Temple First Stalfos Chest": () => true,
            "Forest Temple GS First Room": "
                (isAdult() and (Hookshot or Bow or Bombs)) or (isChild() and (Boomerang or Slingshot)) or
                has_bombchus or can_use(Dins_Fire) or (logic_forest_first_gs and (Bombs or
                    (can_jumpslash and (damage_multiplier != 'ohko' or Fairy or can_use(Nayrus_Love)))))",
            "Forest Temple GS Lobby": () => inventory.shot
        },
        exits: {
            "SFM Forest Temple Entrance Ledge": () => true,
            "Forest Temple NW Outdoors": () => inventory.time && inventory.ocarina,
            "Forest Temple NE Outdoors": () => inventory.bow,
            "Forest Temple Block Push Room": "(Small_Key_Forest_Temple, 1)",
            "Forest Temple Boss Region": "Forest_Temple_Jo_and_Beth and Forest_Temple_Amy_and_Meg"
        }
    },
    {
        regionName: "Forest Temple NW Outdoors",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple GS Level Island Courtyard": "
                can_use(Longshot) or 
                at('Forest Temple Outside Upper Ledge', can_use(Hookshot))"
        },
        exits: {
            "Forest Temple NE Outdoors": () => inventory.scale > 1,
            "Forest Temple Outdoors High Balconies": "
                here(isAdult() or hasExplosives() or
                        ((Boomerang or Nuts or Deku_Shield) and
                            (Sticks or Kokiri_Sword or Slingshot)))"
        }
    },
    {
        regionName: "Forest Temple NE Outdoors",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple Raised Island Courtyard Chest": "
                can_use(Hookshot) or
                at('Forest Temple Falling Room', True) or
                (logic_forest_outdoors_ledge and can_use(Hover_Boots) and at('Forest Temple Outdoors High Balconies', True))",
            "Forest Temple GS Raised Island Courtyard": "
                can_use(Hookshot) or (logic_forest_outdoor_east_gs and can_use(Boomerang)) or
                at('Forest Temple Falling Room', can_use(Bow) or can_use(Dins_Fire) or hasExplosives())", // COME BACK - move or copy this to the other location?
        },
        exits: {
            "Forest Temple Outdoors High Balconies": () => inventory.shot > 1 || (logic_forest_vines && inventory.shot),
            "Forest Temple NW Outdoors": () => inventory.bootsiron || inventory.scale > 1,
            "Forest Temple Lobby": () => true
        }
    },
    {
        regionName: "Forest Temple Outdoors High Balconies",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple Well Chest": () => true,
            "Forest Temple Map Chest": () => true
        },
        exits: {
            "Forest Temple NW Outdoors": () => true,
            "Forest Temple NE Outdoors": () => true,
            "Forest Temple Falling Room": () => logic_forest_door_frame && inventory.bootshover && "
                logic_forest_door_frame and can_use(Hover_Boots) and can_use(Scarecrow)" // COME BACK - can_use(Scarecrow)
        }
    },
    {
        regionName: "Forest Temple Falling Room",
        dungeon: "Forest Temple",
        events: {
            "Forest Temple Amy and Meg": () => inventory.bow
        },
        locations: {
            "Forest Temple Falling Ceiling Room Chest": () => true
        },
        exits: {
            "Forest Temple NE Outdoors": () => true
        }
    },
    {
        regionName: "Forest Temple Block Push Room",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple Eye Switch Chest": () => inventory.strength && inventory.bow
        },
        exits: {
            #end of the road for child forest. No hovers and too short to climb push blocks
            "Forest Temple Outside Upper Ledge": "
                can_use(Hover_Boots) or (logic_forest_outside_backdoor and isAdult() and Progressive_Strength_Upgrade)",
            "Forest Temple Bow Region": "
                Progressive_Strength_Upgrade and (Small_Key_Forest_Temple, 3) and isAdult()",
            "Forest Temple Straightened Hall": "
                Progressive_Strength_Upgrade and (Small_Key_Forest_Temple, 2) and can_use(Bow)"
        }
    },
    {
        regionName: "Forest Temple Straightened Hall",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple Boss Key Chest": () => true
        },
        exits: {
            "Forest Temple Outside Upper Ledge": () => true
        }
    },
    {
        regionName: "Forest Temple Outside Upper Ledge",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple Floormaster Chest": () => true
        },
        exits: {
            "Forest Temple NW Outdoors": () => true
        }
    },
    {
        regionName: "Forest Temple Bow Region",
        dungeon: "Forest Temple",
        events: {
            "Forest Temple Jo and Beth": () => inventory.bow
        },
        locations: {
            "Forest Temple Bow Chest": () => true,
            "Forest Temple Red Poe Chest": () => inventory.bow,
            "Forest Temple Blue Poe Chest": () => inventory.bow
        },
        exits: {
            "Forest Temple Falling Room": "
            (Small_Key_Forest_Temple, 5) and (Bow or can_use(Dins_Fire))"
        }
    },
    {
        regionName: "Forest Temple Boss Region",
        dungeon: "Forest Temple",
        locations: {
            "Forest Temple Basement Chest": () => true,
            "Forest Temple Phantom Ganon Heart": "Boss_Key_Forest_Temple",
            "Phantom Ganon": "Boss_Key_Forest_Temple",
            "Forest Temple GS Basement": () => inventory.shot
        }
    },
// Ganons Castle.json
    {
        regionName: "Ganons Castle Lobby",
        dungeon: "Ganons Castle",
        exits: {
            "Castle Grounds": () => true,
            "Ganons Castle Forest Trial": () => true,
            "Ganons Castle Fire Trial": () => true,
            "Ganons Castle Water Trial": () => true,
            "Ganons Castle Shadow Trial": () => true,
            "Ganons Castle Spirit Trial": () => true,
            "Ganons Castle Light Trial": "can_use(Golden_Gauntlets)",
            "Ganons Castle Tower": "
                (skipped_trials[Forest] or 'Forest Trial Clear') and 
                (skipped_trials[Fire] or 'Fire Trial Clear') and 
                (skipped_trials[Water] or 'Water Trial Clear') and 
                (skipped_trials[Shadow] or 'Shadow Trial Clear') and 
                (skipped_trials[Spirit] or 'Spirit Trial Clear') and 
                (skipped_trials[Light] or 'Light Trial Clear')",
            "Ganons Castle Deku Scrubs": "logic_lens_castle or (inventory.lens && inventory.magic)"
        }
    },
    {
        regionName: "Ganons Castle Deku Scrubs",
        dungeon: "Ganons Castle",
        locations: {
            "Ganons Castle Deku Scrub Center-Left": () => true,
            "Ganons Castle Deku Scrub Center-Right": () => true,
            "Ganons Castle Deku Scrub Right": () => true,
            "Ganons Castle Deku Scrub Left": () => true,
            "Free Fairies": "has_bottle"
        }
    },
    {
        regionName: "Ganons Castle Forest Trial",
        dungeon: "Ganons Castle",
        events: {
            "Forest Trial Clear": "can_use(Light_Arrows) and (Fire_Arrows or Dins_Fire)"
        },
        locations: {
            "Ganons Castle Forest Trial Chest": () => true
        }
    },
    {
        regionName: "Ganons Castle Fire Trial",
        dungeon: "Ganons Castle",
        events: {
            "Fire Trial Clear": "
                can_use(Goron_Tunic) and can_use(Golden_Gauntlets) and 
                can_use(Light_Arrows) and can_use(Longshot)"
        }
    },
    {
        regionName: "Ganons Castle Water Trial",
        dungeon: "Ganons Castle",
        events: {
            "Water Trial Clear": "Blue_Fire and Megaton_Hammer and can_use(Light_Arrows)"
        },
        locations: {
            "Ganons Castle Water Trial Left Chest": () => true,
            "Ganons Castle Water Trial Right Chest": () => true,
            "Blue Fire": "has_bottle"
        }
    },
    {
        regionName: "Ganons Castle Shadow Trial",
        dungeon: "Ganons Castle",
        events: {
            "Shadow Trial Clear": "
                can_use(Light_Arrows) and Megaton_Hammer and 
                ((Fire_Arrows and (logic_lens_castle or (inventory.lens && inventory.magic))) or 
                    (can_use(Longshot) and (Hover_Boots or (Dins_Fire and (logic_lens_castle or (inventory.lens && inventory.magic))))))"
        },
        locations: {
            "Ganons Castle Shadow Trial Front Chest": "
                can_use(Fire_Arrows) or Progressive_Hookshot or 
                Hover_Boots or (inventory.time && inventory.ocarina)",
            "Ganons Castle Shadow Trial Golden Gauntlets Chest": "
                can_use(Fire_Arrows) or 
                (can_use(Longshot) and (Hover_Boots or can_use(Dins_Fire)))"
        }
    },
    {
        regionName: "Ganons Castle Spirit Trial",
        dungeon: "Ganons Castle",
        events: {
            "Spirit Trial Clear": "
                can_use(Light_Arrows) and Mirror_Shield and has_bombchus and
                (logic_spirit_trial_hookshot or Progressive_Hookshot)"
        },
        locations: {
            "Ganons Castle Spirit Trial Crystal Switch Chest": "
                (logic_spirit_trial_hookshot or Progressive_Hookshot)",
            "Ganons Castle Spirit Trial Invisible Chest": "
                (logic_spirit_trial_hookshot or Progressive_Hookshot) and
                has_bombchus and (logic_lens_castle or (inventory.lens && inventory.magic))",
            "Nut Pot": "
                (logic_spirit_trial_hookshot or Progressive_Hookshot) and
                has_bombchus and Bow and Mirror_Shield"
        }
    },
    {
        regionName: "Ganons Castle Light Trial",
        dungeon: "Ganons Castle",
        events: {
            "Light Trial Clear": "
                can_use(Light_Arrows) and Progressive_Hookshot and 
                (Small_Key_Ganons_Castle, 2) and (logic_lens_castle or (inventory.lens && inventory.magic))"
        },
        locations: {
            "Ganons Castle Light Trial First Left Chest": () => true,
            "Ganons Castle Light Trial Second Left Chest": () => true,
            "Ganons Castle Light Trial Third Left Chest": () => true,
            "Ganons Castle Light Trial First Right Chest": () => true,
            "Ganons Castle Light Trial Second Right Chest": () => true,
            "Ganons Castle Light Trial Third Right Chest": () => true,
            "Ganons Castle Light Trial Invisible Enemies Chest": "logic_lens_castle or (inventory.lens && inventory.magic)",
            "Ganons Castle Light Trial Lullaby Chest": "
                (inventory.lullaby && inventory.ocarina) and (Small_Key_Ganons_Castle, 1)"
        }
    },
// Gerudo Training Grounds.json
    {
        regionName: "Gerudo Training Grounds Lobby",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Lobby Left Chest": () => inventory.bow,
            "Gerudo Training Grounds Lobby Right Chest": () => inventory.bow,
            "Gerudo Training Grounds Stalfos Chest": () => true,
            "Gerudo Training Grounds Beamos Chest": () => hasExplosives()
        },
        exits: {
            "Gerudo Fortress": () => true,
            "Gerudo Training Grounds Heavy Block Room": () => inventory.shot || logic_gtg_without_hookshot,
            "Gerudo Training Grounds Lava Room": () => hasExplosives(),
            "Gerudo Training Grounds Central Maze": () => true
        }
    },
    {
        regionName: "Gerudo Training Grounds Central Maze",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Hidden Ceiling Chest": "(Small_Key_Gerudo_Training_Grounds, 3) and (logic_lens_gtg or (inventory.lens && inventory.magic))",
            "Gerudo Training Grounds Maze Path First Chest": "(Small_Key_Gerudo_Training_Grounds, 4)",
            "Gerudo Training Grounds Maze Path Second Chest": "(Small_Key_Gerudo_Training_Grounds, 6)",
            "Gerudo Training Grounds Maze Path Third Chest": "(Small_Key_Gerudo_Training_Grounds, 7)",
            "Gerudo Training Grounds Maze Path Final Chest": "(Small_Key_Gerudo_Training_Grounds, 9)"
        },
        exits: {
            "Gerudo Training Grounds Central Maze Right": "(Small_Key_Gerudo_Training_Grounds, 9)"
        }
    },
    {
        regionName: "Gerudo Training Grounds Central Maze Right",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Maze Right Central Chest": () => true,
            "Gerudo Training Grounds Maze Right Side Chest": () => true,
            "Gerudo Training Grounds Freestanding Key": () => true
        },
        exits: {
            "Gerudo Training Grounds Hammer Room": () => inventory.shot,
            "Gerudo Training Grounds Lava Room": () => true
        }
    },
    {
        regionName: "Gerudo Training Grounds Lava Room",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Underwater Silver Rupee Chest": "
                can_use(Hookshot) and (inventory.time && inventory.ocarina) and Iron_Boots and 
                    (logic_fewer_tunic_requirements or can_use(Zora_Tunic))"
        },
        exits: {
            "Gerudo Training Grounds Central Maze Right": "(inventory.time && inventory.ocarina) or isChild()",
            "Gerudo Training Grounds Hammer Room": "
                can_use(Longshot) or (can_use(Hookshot) and can_use(Hover_Boots))"
        }
    },
    {
        regionName: "Gerudo Training Grounds Hammer Room",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Hammer Room Clear Chest": () => true,
            "Gerudo Training Grounds Hammer Room Switch Chest": "can_use(Megaton_Hammer)"
        },
        exits: {
            "Gerudo Training Grounds Eye Statue Lower": "can_use(Megaton_Hammer) and Bow",
            "Gerudo Training Grounds Lava Room": () => true
        }
    },
    {
        regionName: "Gerudo Training Grounds Eye Statue Lower",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Eye Statue Chest": "can_use(Bow)"
        },
        exits: {
            "Gerudo Training Grounds Hammer Room": () => true
        }
    },
    {
        regionName: "Gerudo Training Grounds Eye Statue Upper",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Near Scarecrow Chest": "can_use(Bow)"
        },
        exits: {
            "Gerudo Training Grounds Eye Statue Lower": () => true
        }
    },
    {
        regionName: "Gerudo Training Grounds Heavy Block Room",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Before Heavy Block Chest": () => true
        },
        exits: {
            "Gerudo Training Grounds Eye Statue Upper": "
                (logic_lens_gtg or (inventory.lens && inventory.magic)) and
                (can_use(Hookshot) or (logic_gtg_fake_wall and can_use(Hover_Boots)))",
            "Gerudo Training Grounds Like Like Room": "
                can_use(Silver_Gauntlets) and (logic_lens_gtg or (inventory.lens && inventory.magic)) and
                (can_use(Hookshot) or (logic_gtg_fake_wall and can_use(Hover_Boots)))"
        }
    },
    {
        regionName: "Gerudo Training Grounds Like Like Room",
        dungeon: "Gerudo Training Grounds",
        locations: {
            "Gerudo Training Grounds Heavy Block First Chest": () => true,
            "Gerudo Training Grounds Heavy Block Second Chest": () => true,
            "Gerudo Training Grounds Heavy Block Third Chest": () => true,
            "Gerudo Training Grounds Heavy Block Fourth Chest": () => true
        }
    },
// Ice Cavern.json
    {
        regionName: "Ice Cavern Beginning",
        dungeon: "Ice Cavern",
        exits: {
            "ZF Ice Ledge": () => true,
            "Ice Cavern": () => isAdult() || hasExplosives() || (inventory.dins && inventory.magic)
        }
    },
    {
        regionName: "Ice Cavern",
        dungeon: "Ice Cavern",
        locations: {
            "Ice Cavern Map Chest": () => inventory.bottle && isAdult(),
            "Ice Cavern Compass Chest": () => inventory.bottle,
            "Ice Cavern Iron Boots Chest": () => inventory.bottle && (isAdult() || inventory.slingshot || inventory.sticks || inventory.swordkokiri || (inventory.dins && inventory.magic),
            "Sheik in Ice Cavern": () => inventory.bottle && (isAdult() || inventory.slingshot || inventory.sticks || inventory.swordkokiri || (inventory.dins && inventory.magic),
            "Ice Cavern Freestanding PoH": () => inventory.bottle,
            "Ice Cavern GS Spinning Scythe Room": () => (inventory.shot && isAdult()) || (inventory.boomerang && isChild()),
            "Ice Cavern GS Heart Piece Room": () => inventory.bottle && ((inventory.shot && isAdult() || (inventory.boomerang && isChild()),
            "Ice Cavern GS Push Block Room": () => inventory.bottle && ((inventory.shot && isAdult()) || (inventory.boomerang && isChild()) || (logic_ice_block_gs && inventory.bootshover && isAdult()))
        }
    },
// Jabu Jabus Belly.json
    {
        regionName: "Jabu Jabus Belly Beginning",
        dungeon: "Jabu Jabus Belly",
        exits: {
            "Zoras Fountain": () => true,
            "Jabu Jabus Belly Main": () => canUseProjectile()
        }
    },
    {
        regionName: "Jabu Jabus Belly Main",
        dungeon: "Jabu Jabus Belly",
        locations: {
            "Jabu Jabus Belly Boomerang Chest": () => true,
            "Jabu Jabus Belly GS Water Switch Room": () => true,
            "Jabu Jabus Belly GS Lobby Basement Lower": () => (inventory.boomerang && isChild()) || (inventory.shot && isAdult()),
            "Jabu Jabus Belly GS Lobby Basement Upper": () => (inventory.boomerang && isChild()) || (inventory.shot && isAdult()),
            "Jabu Jabus Belly Deku Scrub": () => isChild() || inventory.scale || logic_jabu_scrub_jump_dive || (isAdult() && inventory.bootsiron)
        },
        exits: {
            "Jabu Jabus Belly Beginning": () => true,
            "Jabu Jabus Belly Depths": () => isChild() && inventory.boomerang,
            "Jabu Jabus Belly Boss Area": "logic_jabu_boss_gs_adult and can_use(Hover_Boots)"
        }
    },
    {
        regionName: "Jabu Jabus Belly Depths",
        dungeon: "Jabu Jabus Belly",
        locations: {
            "Jabu Jabus Belly Map Chest": () => true,
            "Jabu Jabus Belly Compass Chest": () => true
        },
        exits: {
            "Jabu Jabus Belly Main": () => true,
            "Jabu Jabus Belly Boss Area": () => inventory.sticks || inventory.swordkokiri
        }
    },
    {
        regionName: "Jabu Jabus Belly Boss Area",
        dungeon: "Jabu Jabus Belly",
        locations: {
            "Jabu Jabus Belly Barinade Heart": () => isChild() && inventory.boomerang,
            "Barinade": () => isChild() && inventory.boomerang,
            "Jabu Jabus Belly GS Near Boss": () => true,
            "Nut Pot": () => true
        },
        exits: {
            "Jabu Jabus Belly Main": () => true
        }
    },
// Shadow Temple.json
    {
        regionName: "Shadow Temple Entryway",
        dungeon: "Shadow Temple",
        exits: {
            "Graveyard Warp Pad Region": () => true,
            "Shadow Temple Beginning": "
                (logic_lens_shadow or (inventory.lens && inventory.magic)) and
                (can_use(Hover_Boots) or can_use(Hookshot))"
        }
    },
    {
        regionName: "Shadow Temple Beginning",
        dungeon: "Shadow Temple",
        locations: {
            "Shadow Temple Map Chest": () => true,
            "Shadow Temple Hover Boots Chest": () => true,
            "Nut Pot": () => true
        },
        exits: {
            "Shadow Temple Entryway": () => true,
            "Shadow Temple First Beamos": "Hover_Boots"
        }
    },
    {
        regionName: "Shadow Temple First Beamos",
        dungeon: "Shadow Temple",
        locations: {
            "Shadow Temple Compass Chest": () => true,
            "Shadow Temple Early Silver Rupee Chest": () => true
        },
        exits: {
            "Shadow Temple Huge Pit": "hasExplosives() and (Small_Key_Shadow_Temple, 1)"
        }
    },
    {
        regionName: "Shadow Temple Huge Pit",
        dungeon: "Shadow Temple",
        locations: {
            "Shadow Temple Invisible Blades Visible Chest": () => true,
            "Shadow Temple Invisible Blades Invisible Chest": () => true,
            "Shadow Temple Falling Spikes Lower Chest": () => true,
            "Shadow Temple Falling Spikes Upper Chest": "logic_shadow_umbrella or Progressive_Strength_Upgrade",
            "Shadow Temple Falling Spikes Switch Chest": "logic_shadow_umbrella or Progressive_Strength_Upgrade",
            "Shadow Temple Invisible Spikes Chest": "
                (Small_Key_Shadow_Temple, 2) and (logic_lens_shadow_back or (inventory.lens && inventory.magic))",
            "Shadow Temple Freestanding Key": "
                (Small_Key_Shadow_Temple, 2) and (logic_lens_shadow_back or (inventory.lens && inventory.magic)) 
                and Progressive_Hookshot and 
                (Bombs or Progressive_Strength_Upgrade or
                    (logic_shadow_freestanding_key and has_bombchus))",
            "Shadow Temple GS Like Like Room": () => true,
            "Shadow Temple GS Falling Spikes Room": "logic_shadow_umbrella_gs or Progressive_Hookshot",
            "Shadow Temple GS Single Giant Pot": "
                (Small_Key_Shadow_Temple, 2) and (logic_lens_shadow_back or (inventory.lens && inventory.magic)) 
                and Progressive_Hookshot"
        },
        exits: {
            "Shadow Temple Wind Tunnel": "
                (logic_lens_shadow_back or (inventory.lens && inventory.magic)) and 
                Progressive_Hookshot and (Small_Key_Shadow_Temple, 3)"
        }
    },
    {
        regionName: "Shadow Temple Wind Tunnel",
        dungeon: "Shadow Temple",
        locations: {
            "Shadow Temple Wind Hint Chest": () => true,
            "Shadow Temple After Wind Enemy Chest": () => true,
            "Shadow Temple After Wind Hidden Chest": () => true,
            "Shadow Temple GS Near Ship": "can_use(Longshot) and (Small_Key_Shadow_Temple, 4)"
        },
        exits: {
            "Shadow Temple Beyond Boat": "(inventory.lullaby && inventory.ocarina) and (Small_Key_Shadow_Temple, 4)"
        }
    },
    {
        regionName: "Shadow Temple Beyond Boat",
        dungeon: "Shadow Temple",
        locations: {
            "Shadow Temple Spike Walls Left Chest": "can_use(Dins_Fire)",
            "Shadow Temple Boss Key Chest": "can_use(Dins_Fire)",
            "Shadow Temple Invisible Floormaster Chest": () => true,
            "Shadow Temple Bongo Bongo Heart": "
                (Small_Key_Shadow_Temple, 5) and Boss_Key_Shadow_Temple and
                (Bow or can_use(Distant_Scarecrow) or (logic_shadow_statue and has_bombchus))",
            "Bongo Bongo": "
                (Small_Key_Shadow_Temple, 5) and Boss_Key_Shadow_Temple and
                (Bow or can_use(Distant_Scarecrow) or (logic_shadow_statue and has_bombchus))",
            "Shadow Temple GS Triple Giant Pot": () => true
        }
    },
// Spirit Temple.json
    {
        regionName: "Spirit Temple Lobby",
        dungeon: "Spirit Temple",
        exits: {
            "Desert Colossus From Spirit Lobby": () => true,
            "Child Spirit Temple": () => isChild(),
            "Early Adult Spirit Temple": "can_use(Silver_Gauntlets)"
        }
    },
    {
        regionName: "Child Spirit Temple",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Child Bridge Chest": "
                (Boomerang or Slingshot or (has_bombchus and logic_spirit_child_bombchu)) and 
                (Sticks or hasExplosives() or 
                    ((Nuts or Boomerang) and 
                        (Kokiri_Sword or Slingshot)))",
            "Spirit Temple Child Early Torches Chest": "
                (Boomerang or Slingshot or (has_bombchus and logic_spirit_child_bombchu)) and 
                (Sticks or hasExplosives() or 
                    ((Nuts or Boomerang) and (Kokiri_Sword or Slingshot))) and 
                (Sticks or can_use(Dins_Fire))",
            "Spirit Temple GS Metal Fence": "
                (Boomerang or Slingshot or (has_bombchus and logic_spirit_child_bombchu)) and 
                (Sticks or hasExplosives() or 
                    ((Nuts or Boomerang) and (Kokiri_Sword or Slingshot)))"
        },
        exits: {
            "Child Spirit Before Locked Door": () => true
        }
    },
    {
        regionName: "Child Spirit Before Locked Door",
        dungeon: "Spirit Temple",
        exits: {
            "Child Spirit Temple Climb": "(Small_Key_Spirit_Temple, 1)"
        }
    },
    {
        regionName: "Child Spirit Temple Climb",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Child Climb North Chest": "
                has_projectile(both) or 
                (((Small_Key_Spirit_Temple, 3) or 
                    ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not entrance_shuffle)) and 
                can_use(Silver_Gauntlets) and has_projectile(adult)) or 
                ((Small_Key_Spirit_Temple, 5) and isChild() and 
                    has_projectile(child))",
            "Spirit Temple Child Climb East Chest": "
                has_projectile(both) or 
                (((Small_Key_Spirit_Temple, 3) or 
                    ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not entrance_shuffle)) and 
                can_use(Silver_Gauntlets) and has_projectile(adult)) or 
                ((Small_Key_Spirit_Temple, 5) and isChild() and 
                    has_projectile(child))",
            "Spirit Temple GS Sun on Floor Room": "
                has_projectile(both) or can_use(Dins_Fire) or 
                ((damage_multiplier != 'ohko' or Fairy or can_use(Nayrus_Love)) and 
                    (Sticks or Kokiri_Sword or has_projectile(child))) or 
                (isChild() and 
                    (Small_Key_Spirit_Temple, 5) and has_projectile(child)) or 
                (((Small_Key_Spirit_Temple, 3) or 
                    ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not entrance_shuffle)) and 
                can_use(Silver_Gauntlets) and
                (has_projectile(adult) or damage_multiplier != 'ohko' or 
                    Fairy or can_use(Nayrus_Love)))"
        },
        exits: {
            "Spirit Temple Central Chamber": () => hasExplosives(),
            "Child Spirit Before Locked Door": "(Small_Key_Spirit_Temple, 5)"
        }
    },
    {
        regionName: "Early Adult Spirit Temple",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Compass Chest": "
                can_use(Hookshot) and (inventory.lullaby && inventory.ocarina)",
            "Spirit Temple Early Adult Right Chest": "
                Bow or Progressive_Hookshot or has_bombchus or (Bombs and logic_spirit_lower_adult_switch)", 
                #requires a very specific Bombchu use, Hover Boots can be skipped by jumping on top of the rolling rock.
            "Spirit Temple First Mirror Left Chest": "(Small_Key_Spirit_Temple, 3)",
            "Spirit Temple First Mirror Right Chest": "(Small_Key_Spirit_Temple, 3)",
            "Spirit Temple GS Boulder Room": () => (inventory.time && inventory.ocarina) && (inventory.bow || inventory.shot || inventory.bombchus || (inventory.bombs && logic_spirit_lower_adult_switch))
        },
        exits: {
            "Spirit Temple Central Chamber": "(Small_Key_Spirit_Temple, 1)"
        }
    },
    {
        regionName: "Spirit Temple Central Chamber",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Map Chest": "
                ((hasExplosives() or (Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not entrance_shuffle)) and 
                    (can_use(Dins_Fire) or
                        (((Magic_Meter and Fire_Arrows) or logic_spirit_map_chest) and Bow and Sticks))) or 
                ((Small_Key_Spirit_Temple, 5) and hasExplosives() and 
                    can_use(Sticks)) or 
                ((Small_Key_Spirit_Temple, 3) and
                    (can_use(Fire_Arrows) or (logic_spirit_map_chest and Bow)) and 
                    can_use(Silver_Gauntlets))",
            "Spirit Temple Sun Block Room Chest": "
                ((hasExplosives() or (Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not entrance_shuffle)) and 
                    (can_use(Dins_Fire) or
                        (((Magic_Meter and Fire_Arrows) or logic_spirit_sun_chest) and Bow and Sticks))) or 
                ((Small_Key_Spirit_Temple, 5) and hasExplosives() and
                    can_use(Sticks)) or 
                ((Small_Key_Spirit_Temple, 3) and
                    (can_use(Fire_Arrows) or (logic_spirit_sun_chest and Bow)) and 
                    can_use(Silver_Gauntlets))",
            "Spirit Temple Statue Room Hand Chest": "
                (Small_Key_Spirit_Temple, 3) and can_use(Silver_Gauntlets) and 
                (inventory.lullaby && inventory.ocarina)",
            "Spirit Temple Statue Room Northeast Chest": "
                (Small_Key_Spirit_Temple, 3) and can_use(Silver_Gauntlets) and (inventory.lullaby && inventory.ocarina) and 
                (Progressive_Hookshot or Hover_Boots or logic_spirit_lobby_jump)",
            "Spirit Temple GS Hall After Sun Block Room": "
                (hasExplosives() and Boomerang and Progressive_Hookshot) or 
                (can_use(Boomerang) and (Small_Key_Spirit_Temple, 5) and hasExplosives()) or 
                (Progressive_Hookshot and can_use(Silver_Gauntlets) and 
                    ((Small_Key_Spirit_Temple, 3) or 
                        ((Small_Key_Spirit_Temple, 2) and Boomerang and bombchus_in_logic and not entrance_shuffle)))",
            "Spirit Temple GS Lobby": "
                ((hasExplosives() or (Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not entrance_shuffle)) and 
                    logic_spirit_lobby_gs and Boomerang and (Progressive_Hookshot or Hover_Boots or logic_spirit_lobby_jump)) or
                (logic_spirit_lobby_gs and (Small_Key_Spirit_Temple, 5) and hasExplosives() and can_use(Boomerang)) or
                ((Small_Key_Spirit_Temple, 3) and can_use(Silver_Gauntlets) and (Progressive_Hookshot or Hover_Boots or logic_spirit_lobby_jump))"
        },
        exits: {
            "Spirit Temple Outdoor Hands": () => true,
            "Spirit Temple Beyond Central Locked Door": "
                (Small_Key_Spirit_Temple, 4) and can_use(Silver_Gauntlets)",
            "Child Spirit Temple Climb": () => true
        }
    },
    {
        regionName: "Spirit Temple Outdoor Hands",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Silver Gauntlets Chest": "
                ((Small_Key_Spirit_Temple, 3) and (Progressive_Hookshot, 2) and hasExplosives()) or 
                (Small_Key_Spirit_Temple, 5)",
            "Spirit Temple Mirror Shield Chest": "
                (Small_Key_Spirit_Temple, 4) and can_use(Silver_Gauntlets) and hasExplosives()"
        },
        exits: {
            "Desert Colossus": "
                (isChild() and (Small_Key_Spirit_Temple, 5)) or
                (can_use(Silver_Gauntlets) and
                    (((Small_Key_Spirit_Temple, 3) and hasExplosives()) or (Small_Key_Spirit_Temple, 5)))"
        }
    },
    {
        regionName: "Spirit Temple Beyond Central Locked Door",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Near Four Armos Chest": () => inventory.shieldmirror && hasExplosives(),
            "Spirit Temple Hallway Left Invisible Chest": () => (logic_lens_spirit || (inventory.lens && inventory.magic)) && hasExplosives(),
            "Spirit Temple Hallway Right Invisible Chest": () => (logic_lens_spirit || (inventory.lens && inventory.magic)) && hasExplosives()
        },
        exits: {
            "Spirit Temple Beyond Final Locked Door": "
                (Small_Key_Spirit_Temple, 5) and 
                (logic_spirit_wall or can_use(Longshot) or has_bombchus or 
                    ((Bombs or Nuts or can_use(Dins_Fire)) and 
                        (Bow or can_use(Hookshot) or Megaton_Hammer)))"
        }
    },
    {
        regionName: "Spirit Temple Beyond Final Locked Door",
        dungeon: "Spirit Temple",
        locations: {
            "Spirit Temple Boss Key Chest": () => inventory.lullaby && inventory.ocarina && inventory.bow && inventory.shot,
            "Spirit Temple Topmost Chest": () => inventory.shieldmirror,
            "Spirit Temple Twinrova Heart": () => inventory.shieldmirror && hasExplosives() && inventory.shot && "
                Mirror_Shield and hasExplosives() and 
                Progressive_Hookshot and Boss_Key_Spirit_Temple", // COME BACK - boss key
            "Twinrova": "
                Mirror_Shield and hasExplosives() and 
                Progressive_Hookshot and Boss_Key_Spirit_Temple"
        }
    },
// Water Temple.json
    {
        regionName: "Water Temple Lobby",
        dungeon: "Water Temple",
        events: {
            "Child Water Temple": () => isChild(),
                # Child can access only the falling platform room as the sole entrant into Water Temple.
                # Use Child_Water_Temple for cases where child assists after the water is lowered.
            "Raise Water Level": "
                (isAdult() and (Hookshot or Hover_Boots or Bow)) or
                (has_fire_source_with_torch and can_use_projectile)"
                # Ensure that the water level can be raised if it were to be lowered.
        },
        exits: {
            "Lake Hylia": () => true,
            "Water Temple Highest Water Level": "Raise_Water_Level",
            "Water Temple Dive": "
                (can_use(Zora_Tunic) or logic_fewer_tunic_requirements) and
                ((logic_water_temple_torch_longshot and can_use(Longshot)) or can_use(Iron_Boots))"
        }
    },
    {
        regionName: "Water Temple Highest Water Level",
        dungeon:  "Water Temple",
        events: {
            "Water Temple Clear": "Boss_Key_Water_Temple and can_use(Longshot)"
        },
        locations: {
            "Morpha": "Boss_Key_Water_Temple and can_use(Longshot)",
            "Water Temple Morpha Heart": "Boss_Key_Water_Temple and can_use(Longshot)",
        },
        exits: {
            "Water Temple Falling Platform Room": "(Small_Key_Water_Temple, 5)"
        }
    },
    {
        regionName: "Water Temple Dive",
        dungeon: "Water Temple",
        locations: {
            "Water Temple Map Chest": "Raise_Water_Level",
            "Water Temple Compass Chest": "
                ((inventory.lullaby && inventory.ocarina) or Iron_Boots) and can_use(Hookshot)",
            "Water Temple Torches Chest": "
                (Bow or can_use(Dins_Fire) or 
                    (Child_Water_Temple and Sticks and Kokiri_Sword and Magic_Meter)) and
                (inventory.lullaby && inventory.ocarina)",
            "Water Temple Central Bow Target Chest": "
                Progressive_Strength_Upgrade and (inventory.lullaby && inventory.ocarina) and 
                ((Bow and (logic_water_central_bow or Hover_Boots or can_use(Longshot))) or
                    (logic_water_central_bow and Child_Water_Temple and Slingshot and at('Water Temple Middle Water Level', True)))",
            "Water Temple GS Behind Gate": "
                (can_use(Hookshot) or can_use(Hover_Boots)) and 
                hasExplosives() and (inventory.lullaby && inventory.ocarina) and
                (can_use(Iron_Boots) or can_dive)",
            "Water Temple GS Central Pillar": "
                (inventory.lullaby && inventory.ocarina) and
                    (((can_use(Longshot) or (logic_water_central_gs_fw and can_use(Hookshot) and can_use(Farores_Wind))) and 
                        ((Small_Key_Water_Temple, 6) or can_use(Bow) or can_use(Dins_Fire))) or
                    (logic_water_central_gs_irons and can_use(Hookshot) and can_use(Iron_Boots) and
                        (can_use(Bow) or can_use(Dins_Fire))) or
                    (logic_water_central_gs_fw and Child_Water_Temple and Boomerang and can_use(Farores_Wind) and
                        (Sticks or can_use(Dins_Fire) or
                        ((Small_Key_Water_Temple, 6) and (can_use(Hover_Boots) or can_use(Bow))))))"
        },
        exits: {
            "Water Temple Cracked Wall": "
                (inventory.lullaby && inventory.ocarina) and (can_use(Hookshot) or can_use(Hover_Boots)) and
                (logic_water_cracked_wall_nothing or (logic_water_cracked_wall_hovers and can_use(Hover_Boots)))",
            "Water Temple Middle Water Level": "
                (Bow or can_use(Dins_Fire) or
                    ((Small_Key_Water_Temple, 6) and can_use(Hookshot)) or
                    (Child_Water_Temple and Sticks)) and
                (inventory.lullaby && inventory.ocarina)",
            "Water Temple North Basement": "
                (Small_Key_Water_Temple, 5) and
                (can_use(Longshot) or (logic_water_boss_key_region and can_use(Hover_Boots))) and
                (can_use(Iron_Boots) or (inventory.lullaby && inventory.ocarina))",
            "Water Temple Dragon Statue": "
                (inventory.lullaby && inventory.ocarina) and Progressive_Strength_Upgrade and
                ((Iron_Boots and can_use(Hookshot)) or
                    (logic_water_dragon_adult and (has_bombchus or can_use(Bow) or can_use(Hookshot)) and (can_dive or Iron_Boots)) or
                    (logic_water_dragon_child and Child_Water_Temple and (has_bombchus or Slingshot or Boomerang) and can_dive))"
        }
    },
    {
        regionName: "Water Temple North Basement",
        dungeon: "Water Temple",
        locations: {
            "Water Temple Boss Key Chest": "
                (Small_Key_Water_Temple, 6) and 
                (logic_water_bk_jump_dive or can_use(Iron_Boots)) and
                (logic_water_north_basement_ledge_jump or (hasExplosives() and Progressive_Strength_Upgrade) or Hover_Boots)",
            "Water Temple GS Near Boss Key Chest": () => true
        }
    },
    {
        regionName: "Water Temple Cracked Wall",
        dungeon: "Water Temple",
        locations: {
            "Water Temple Cracked Wall Chest": () => hasExplosives()
        }
    },
    {
        regionName: "Water Temple Dragon Statue",
        dungeon: "Water Temple",
        locations: {
            "Water Temple Dragon Chest": () => true
        }
    },
    {
        regionName: "Water Temple Middle Water Level",
        dungeon: "Water Temple",
        locations: {
            "Water Temple Central Pillar Chest": "
                can_use(Iron_Boots) and can_use(Zora_Tunic) and can_use(Hookshot) and 
                ((Small_Key_Water_Temple, 6) or can_use(Bow) or can_use(Dins_Fire))"
        },
        exits: {
            "Water Temple Cracked Wall": () => true
        }
    },
    {
        regionName: "Water Temple Falling Platform Room",
        dungeon: "Water Temple",
        locations: {
            "Water Temple GS Falling Platform Room": () => inventory.shot > 1 || (logic_water_falling_platform_gs_hookshot && inventory.shot)
        },
        exits: {
            "Water Temple Dark Link Region": "(Small_Key_Water_Temple, 6) and can_use(Hookshot)" // COME BACK
        }
    },
    {
        regionName: "Water Temple Dark Link Region",
        dungeon: "Water Temple",
        locations: {
            "Water Temple Longshot Chest": () => true,
            "Water Temple River Chest": () => (inventory.time & inventory.ocarina) && inventory.bow,
            "Water Temple GS River": () => (inventory.time && inventory.ocarina) && ((inventory.bootsiron && (inventory.tuniczora || logic_fewer_tunic_requirements) || (logic_water_river_gs && (inventory.shot > 1 && (inventory.bow || inventory.bombchus))))
        },
        exits: {
            "Water Temple Dragon Statue": () => (inventory.tuniczora || logic_fewer_tunic_requirements) && (inventory.time && inventory.ocarina) && inventory.bow && (inventory.bootsiron || logic_water_dragon_jump_dive || logic_water_dragon_adult)
        }
    }
];


function accessHyruleField() {
  return (isAdult() && adultSpawn === 'Hyrule Field') ||
         (isChild() && childSpawn === 'Hyrule Field')
  ;
}

export {};
