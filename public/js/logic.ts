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
  slingshot: 0,
  boomerang: 0,
  sticks: 0,
  nuts: 0,
  swordKokiri: 0,
  bombs: 0,
  bombchus: 0,
  magic: 0,
  dins: 0,
  bottle: 0,
  shot: 0,
  shieldDeku: 0,
  ocarina: 0,
  storms: 0,
  sarias: 0,
  agony: 0,
  bootsiron: 0,
  bootshover: 0,
  scale: 0,
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
        "Colossus GS Tree": "can_use(Hookshot) and at_night",
        "Colossus GS Hill": "
            isAdult() and at_night and
                (here(can_plant_bean) or can_use(Longshot) or
                    (logic_colossus_gs and can_use(Hookshot)))"
    },
    exits: {
        "Colossus Great Fairy Fountain": "hasExplosives()",
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
        "Beyond Door of Time": "can_play(Song_of_Time) or open_door_of_time"
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
        "Hyrule Castle Grounds": "isChild()",
        "Ganons Castle Grounds": "isAdult()"
    }
},
{
    regionName: "Hyrule Castle Grounds",
    scene: "Castle Grounds",
    timePasses: true,
    locations: {
        "HC Malon Egg": () => true,
        "HC GS Tree": "canChildAttack()",
        "HC Malon Gossip Stone": () => true,
        "HC Rock Wall Gossip Stone": () => true,
        "Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
        "Butterfly Fairy": "can_use(Sticks) and has_bottle",
        "Bug Rock": "has_bottle"
    },
    exits: {
        "Castle Grounds": () => true,
        "HC Garden": "Weird_Egg or skip_child_zelda or (not shuffle_weird_egg)",
        "HC Great Fairy Fountain": "hasExplosives()",
        "HC Storms Grotto":  "canOpenStormGrotto()"
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
        "OGC Great Fairy Fountain": "can_use(Golden_Gauntlets) and at_dampe_time",
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
        "Market GS Guard House": "isChild()"
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
            (at('Lost Woods', isChild() and can_play(Sarias_Song)) and
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
        "Market Shooting Gallery Reward": "isChild()"
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
        "Market Treasure Chest Game Reward": "can_use(Lens_of_Truth)"
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
        "Sheik in Kakariko": "
            isAdult() and Forest_Medallion and Fire_Medallion and Water_Medallion",
        "Kak Anju as Adult": "isAdult() and at_day",
        "Kak Anju as Child": "isChild() and at_day",
        "Kak GS House Under Construction": "isChild() and at_night",
        "Kak GS Skulltula House": "isChild() and at_night",
        "Kak GS Guards House": "isChild() and at_night",
        "Kak GS Tree": "isChild() and at_night",
        "Kak GS Watchtower": "
            isChild() and (Slingshot or has_bombchus or 
                (logic_kakariko_tower_gs and (Sticks or Kokiri_Sword) and
                can_take_damage)) and at_night",
        "Bug Rock": "has_bottle"
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
        "Kak Potion Shop Front": "isChild() or at_day",
        "Kak Redead Grotto": "can_open_bomb_grotto",
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
        "Kak Odd Medicine Building": "isAdult()",
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
        "Drain Well": "isChild() and can_play(Song_of_Storms)" // COME BACK - Make this a check to get to BotW
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
        "Kak Windmill": "isAdult() and can_play(Song_of_Time)"
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
    locations: {
        "Graveyard Gossip Stone": () => true,
        "Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle"
    },
    exits: {
        "Graveyard": () => true,
        "Shadow Temple Entryway": "
            can_use(Dins_Fire) or
            (logic_shadow_fire_arrow_entry and can_use(Fire_Arrows))"
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
                (logic_trail_gs_lower_bean and here(can_plant_bean and (hasExplosives() or Progressive_Strength_Upgrade))))",
        "Bean Plant Fairy": "
            can_plant_bean and can_play(Song_of_Storms) and has_bottle and
            (hasExplosives() or Progressive_Strength_Upgrade)"
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
        "DMT GS Falling Rocks Path": "
            isAdult() and (can_use(Megaton_Hammer) or logic_trail_gs_upper) and at_night",
        "DMT Gossip Stone": () => true,
        "Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
        "Bug Rock": "isChild() and has_bottle"
    },
    exits: {
        "Death Mountain": () => true,
        "DMC Upper Local": () => true,
        "DMT Owl Flight": "isChild()",
        "DMT Cow Grotto": "here(canBlastOrSmash())",
        "DMT Great Fairy Fountain": "here(canBlastOrSmash())"
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
        "Goron City Child Fire": "isChild() and can_use(Dins_Fire)",
        "GC Woods Warp Open": "
            canBlastOrSmash() or can_use(Dins_Fire) or can_use(Bow) or 
            Progressive_Strength_Upgrade or 'Goron City Child Fire'",
        "Stop GC Rolling Goron as Adult": "
            isAdult() and 
            (Progressive_Strength_Upgrade or hasExplosives() or Bow or
                (logic_link_goron_dins and can_use(Dins_Fire)))"
    },
    locations: {
        "GC Maze Left Chest": "
            can_use(Megaton_Hammer) or can_use(Silver_Gauntlets) or
            (logic_goron_city_leftmost and hasExplosives() and can_use(Hover_Boots))",
        "GC Maze Center Chest": "
            canBlastOrSmash() or can_use(Silver_Gauntlets)",
        "GC Maze Right Chest": "
            canBlastOrSmash() or can_use(Silver_Gauntlets)",
        "GC Pot Freestanding PoH": "
            isChild() and 'Goron City Child Fire' and
            (Bombs or (Progressive_Strength_Upgrade and logic_goron_city_pot_with_strength) or (has_bombchus and logic_goron_city_pot))",
        "GC Rolling Goron as Child": "
            isChild() and 
            (hasExplosives() or (Progressive_Strength_Upgrade and logic_child_rolling_with_strength))",
        "GC Medigoron": "
            isAdult() and Progressive_Wallet and 
            (canBlastOrSmash() or Progressive_Strength_Upgrade)",
        "GC Rolling Goron as Adult": "'Stop GC Rolling Goron as Adult'",
        "GC GS Boulder Maze": "isChild() and hasExplosives()",
        "GC GS Center Platform": "isAdult()",
        "GC Maze Gossip Stone": "
            canBlastOrSmash() or can_use(Silver_Gauntlets)",
        "GC Medigoron Gossip Stone": "
            canBlastOrSmash() or Progressive_Strength_Upgrade",
        "Gossip Stone Fairy": "
            can_summon_gossip_fairy_without_suns and has_bottle and
            (canBlastOrSmash() or Progressive_Strength_Upgrade)",
        "Bug Rock": "(canBlastOrSmash() or can_use(Silver_Gauntlets)) and has_bottle",
        "Stick Pot": "isChild()"
    },
    exits: {
        "Death Mountain": () => true,
        "GC Woods Warp": "'GC Woods Warp Open'",
        "GC Shop": "
            (isAdult() and 'Stop GC Rolling Goron as Adult') or 
            (isChild() and (hasExplosives() or Progressive_Strength_Upgrade or 'Goron City Child Fire'))",
        "GC Darunias Chamber": "
            (isAdult() and 'Stop GC Rolling Goron as Adult') or
            (isChild() and can_play(Zeldas_Lullaby))",
        "GC Grotto Platform": "
            isAdult() and 
            ((can_play(Song_of_Time) and 
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
        "GC Woods Warp Open": "canBlastOrSmash() or can_use(Dins_Fire)"
    },
    exits: {
        "Goron City": "can_leave_forest and 'GC Woods Warp Open'",
        "Lost Woods": () => true
    }
},
{
    regionName: "GC Darunias Chamber",
    scene: "Goron City",
    events: {
        "Goron City Child Fire": "can_use(Sticks)"
    },
    locations: {
        "GC Darunias Joy": "isChild() and can_play(Sarias_Song)"
    },
    exits: {
        "Goron City": () => true,
        "DMC Lower Local": "isAdult()"
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
            (can_play(Song_of_Time) and can_use(Longshot))"
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
        "DMC GS Crate": "isChild() and canChildAttack()",
        "DMC Gossip Stone": "hasExplosives()",
        "Gossip Stone Fairy": "
            hasExplosives() and can_summon_gossip_fairy_without_suns and has_bottle"
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
        "DMC Deku Scrub": "isChild() and can_stun_deku"
    },
    exits: {
        "DMC Upper Nearby": "isAdult()",
        "DMC Lower Nearby": "
            can_use(Hover_Boots) or
            (logic_crater_upper_to_lower and can_use(Megaton_Hammer))"
    }
},
{
    regionName: "DMC Lower Nearby",
    scene: "Death Mountain Crater",
    exits: {
        "DMC Lower Local": "can_use(Goron_Tunic)",
        "GC Darunias Chamber": () => true,
        "DMC Great Fairy Fountain": "can_use(Megaton_Hammer)",
        "DMC Hammer Grotto": "can_use(Megaton_Hammer)"
    }
},
{
    regionName: "DMC Lower Local",
    scene: "Death Mountain Crater",
    exits: {
        "DMC Lower Nearby": () => true,
        "DMC Ladder Area Nearby": () => true,
        "DMC Central Nearby": "can_use(Hover_Boots) or can_use(Hookshot)",
        "DMC Fire Temple Entrance": "
            (can_use(Hover_Boots) or can_use(Hookshot)) and
            (logic_fewer_tunic_requirements or can_use(Goron_Tunic))"
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
        "Sheik in Crater": "isAdult()"
    },
    exits: {
        "DMC Central Local": "can_use(Goron_Tunic)"
    }
},
{
    regionName: "DMC Central Local",
    scene: "Death Mountain Crater",
    locations: {
        "DMC GS Bean Patch": "canPlantBugs() and canChildAttack()",
        "Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle"
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
        "DMC Central Nearby": "can_use(Goron_Tunic)"
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
        "ZR GS Tree": "isChild() and canChildAttack()"
    },
    exits: {
        "Zora River": "isAdult() or hasExplosives()",
        "Hyrule Field": () => true
    }
},
{
    regionName: "Zora River",
    scene: "Zora River",
    timePasses: true,
    locations: {
        "ZR Magic Bean Salesman": "isChild()",
        "ZR Frogs Ocarina Game": "
            isChild() and can_play(Zeldas_Lullaby) and can_play(Sarias_Song) and 
            can_play(Suns_Song) and can_play(Eponas_Song) and 
            can_play(Song_of_Time) and can_play(Song_of_Storms)",
        "ZR Frogs in the Rain": "isChild() and can_play(Song_of_Storms)",
        "ZR Near Open Grotto Freestanding PoH": "
            isChild() or can_use(Hover_Boots) or (isAdult() and logic_zora_river_lower)",
        "ZR Near Domain Freestanding PoH": "
            isChild() or can_use(Hover_Boots) or (isAdult() and logic_zora_river_upper)",
        "ZR GS Ladder": "isChild() and at_night and canChildAttack()",
        "ZR GS Near Raised Grottos": "can_use(Hookshot) and at_night",
        "ZR GS Above Bridge": "can_use(Hookshot) and at_night",
        "ZR Near Grottos Gossip Stone": () => true,
        "ZR Near Domain Gossip Stone": () => true,
        "Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
        "Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle",
        "Butterfly Fairy": "can_use(Sticks) and has_bottle",
        "Bug Shrub": "
            (isChild() or can_use(Hover_Boots) or (isAdult() and logic_zora_river_lower)) and
            can_cut_shrubs and has_bottle"
    },
    exits: {
        "ZR Front": () => true,
        "ZR Open Grotto": () => true,
        "Lost Woods": "can_dive or can_use(Iron_Boots)",
        "ZR Storms Grotto": "canOpenStormGrotto()",
        "ZR Behind Waterfall": "
            can_play(Zeldas_Lullaby) or
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
        "ZD Diving Minigame": "isChild()",
        "ZD Chest": "can_use(Sticks)",
        "Deliver Rutos Letter": "
            isChild() and Rutos_Letter and zora_fountain != 'open'",
        "ZD King Zora Thawed": "'King Zora Thawed'",
        "ZD GS Frozen Waterfall": "
            isAdult() and at_night and
            (Progressive_Hookshot or Bow or Magic_Meter or logic_domain_gs)",
        "ZD Gossip Stone": () => true,
        "Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle",
        "Fish Group": "isChild() and has_bottle",
        "Stick Pot": "isChild()",
        "Nut Pot": () => true
    },
    exits: {
        "ZR Behind Waterfall": () => true,
        "Lake Hylia": "isChild() and can_dive",
        "ZD Behind King Zora": "
            Deliver_Letter or zora_fountain == 'open' or
            (zora_fountain == 'adult' and isAdult())",
        "ZD Shop": "isChild() or Blue_Fire",
        "ZD Storms Grotto": "canOpenStormGrotto()"
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
        "ZF Iceberg Freestanding PoH": "isAdult()",
        "ZF Bottom Freestanding PoH": "
            isAdult() and Iron_Boots and (logic_fewer_tunic_requirements or can_use(Zora_Tunic))",
        "ZF GS Tree": "isChild()",
        "ZF GS Above the Log": "can_use(Boomerang) and at_night",
        "ZF GS Hidden Cave": "
            can_use(Silver_Gauntlets) and canBlastOrSmash() and 
            can_use(Hookshot) and at_night"
    },
    exits: {
        "ZD Behind King Zora": () => true,
        "Jabu Jabus Belly Beginning": "isChild() and Fish",
        "ZF Ice Ledge": "isAdult()",
        "ZF Great Fairy Fountain": "hasExplosives()"
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
    "dungeon": "Ganons Castle",
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
}
];


function accessHyruleField() {
  return (isAdult() && adultSpawn === 'Hyrule Field') ||
         (isChild() && childSpawn === 'Hyrule Field')
  ;
}

export {};
