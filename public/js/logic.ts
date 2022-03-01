/* Settings */
const childSpawn: string = 'KF Links House';
const adultSpawn: string = 'Temple of Time';
const keysanity: boolean = false;
const open_forest: boolean = true;
const zora_fountain: string = 'open';
const lacs_condition: string = 'vanilla';
const lacs_stones: number = 0;
const lacs_medallions: number = 0;
const lacs_rewards: number = 0;
const lacs_tokens: number = 0;
const bombchus_in_logic: boolean = true;
const logic_fewer_tunic_requirements: boolean = true;
const logic_grottos_without_agony: boolean = true;
const logic_mido_backflip: boolean = true;
const shuffle_scrubs: boolean = false;
const logic_lens_wasteland: boolean = false;
const logic_wasteland_crossing: boolean = false;
const logic_child_dampe_race_poh: boolean = false;
const open_door_of_time: boolean = true;
const gerudo_fortress: string = 'fast';
const logic_fire_boss_door_jump: boolean = false;
const complete_mask_quest: boolean = false;
const disable_trade_revert: boolean = false;
const guarantee_trade_path: boolean = false;
const open_kakariko: string = 'open';
const logic_forest_outdoors_ledge: boolean = false;
const logic_lost_woods_bridge: boolean = false;
const logic_lost_woods_gs_bean: boolean = false;
const logic_adult_kokiri_gs: boolean = false;
const logic_fire_scarecrow: boolean = false;
const logic_shadow_statue: boolean = false;
const logic_valley_crate_hovers: boolean = false;
const logic_colossus_gs: boolean = false;
const logic_kakariko_rooftop_gs: boolean = false;
const logic_man_on_roof: boolean = true;
const logic_windmill_poh: boolean = true;
const logic_graveyard_poh: boolean = false;
const logic_dmt_soil_gs: boolean = false;
const logic_dmt_bombable: boolean = false;
const logic_trail_gs_lower_hookshot: boolean = false;
const logic_trail_gs_lower_hovers: boolean = false;
const logic_trail_gs_lower_bean: boolean = false;
const big_poe_count: number = 1;
const shuffle_dungeon_entrances: boolean = false;
const shuffle_overworld_entrances: boolean = false;
const logic_visible_collisions: boolean = true;
const logic_trail_gs_upper: boolean = true;
const logic_goron_city_pot_with_strength: boolean = true;
const logic_goron_city_pot: boolean = true;
const damage_multiplier: string = 'normal';
const entrance_shuffle: boolean = false;
const logic_crater_bean_poh_with_hovers: boolean = true;
const logic_zora_with_hovers: boolean = false;
const logic_zora_with_cucco: boolean = false;
const logic_water_bk_jump_dive: boolean = false;
const logic_water_north_basement_ledge_jump: boolean = false;
const logic_lens_botw: boolean = true;
const logic_botw_basement: boolean = false;
const logic_deku_basement_gs: boolean = false;
const logic_dc_staircase: boolean = false;
const logic_dc_vines_gs: boolean = false;
const logic_dc_scrub_room: boolean = false;
const logic_dc_jump: boolean = false;
const logic_lens_castle: boolean = false;
const logic_spirit_trial_hookshot: boolean = false;
const logic_shadow_umbrella: boolean = false;
const logic_lab_wall_gs: boolean = false;
const logic_lens_shadow: boolean = true;
const logic_lens_shadow_back: boolean = true;
const logic_child_deadhand: boolean = true;
const logic_shadow_umbrella_gs: boolean = false;
const logic_dc_slingshot_skip: boolean = false;
const logic_lens_gtg: boolean = true;
const logic_gtg_fake_wall: boolean = true;
const logic_shadow_freestanding_keys: boolean = false;
const logic_spirit_child_bombchu: boolean = false;
const logic_gerudo_kitchen: boolean = false;
const logic_water_hookshot_entry: boolean = false;
const logic_lab_diving: boolean = false;
const logic_kakariko_tower_gs: boolean = false;
const logic_shadow_fire_arrow_entry: boolean = false;
const logic_dmt_climb_hovers: boolean = false;
const logic_domain_gs: boolean = false;
const logic_link_goron_dins: boolean = false;
const logic_goron_city_leftmost: boolean = false;
const logic_child_rolling_with_strength: boolean = false;
const logic_goron_grotto: boolean = false;
const logic_crater_upper_to_lower: boolean = false;
const logic_zora_river_lower: boolean = false;
const logic_zora_river_upper: boolean = false;
const logic_castle_storms_gs: boolean = false;
const logic_deku_b1_skip: boolean = false;
const logic_dc_scarecrow_gs: boolean = false;
const logic_fire_song_of_time: boolean = false;
const logic_fire_strength: boolean = false;
const logic_fire_flame_maze: boolean = false;
const logic_forest_first_gs: boolean = false;
const logic_forest_vines: boolean = true;
const logic_forest_door_frame: boolean = false;
const logic_forest_outside_backdoor: boolean = false;
const logic_rusted_switches: boolean = true;
const logic_gtg_without_hookshot: boolean = false;
const logic_ice_block_gs: boolean = false;
const logic_spirit_lower_adult_switch: boolean = false;
const logic_spirit_lobby_jump: boolean = false;
const logic_spirit_lobby_gs: boolean = false;
const logic_lens_spirit: boolean = false;
const logic_water_temple_torch_longshot: boolean = false;
const logic_spirit_wall: boolean = false;
const skippedTrials = {
    forest = true,
    fire = true,
    water = true,
    shadow = true,
    spirit = true,
    light = true,
};


/* State */
const age: string = 'child';
const oppositeAge: string = 'adult';
const checkStatuses: { [name: string]: boolean } = {
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
  keyswell: 0,
  keysforest: 0,
  bosskeyforest: 0,
  keysfire: 0,
  bosskeyfire: 0,
  keyswater: 0,
  bosskeywater: 0,
  keysshadow: 0,
  bosskeyshadow: 0,
  keysspirit: 0,
  bosskeyspirit: 0,
  keysfortress: 0,
  keysgtg: 0,
  keysganon: 0,
  bosskeyganon: 0,
  slingshot: 0,
  boomerang: 0,
  sticks: 0,
  nuts: 0,
  swordkokiri: 0,
  beans: 0,
  bombs: 0,
  bombchus: 0,
  magic: 0,
  bow: 0,
  dins: 0,
  nayrus: 0,
  lens: 0,
  arrowsfire: 0,
  arrowslight: 0,
  hammer: 0,
  bottle: 0,
  rutos: 0,
  shot: 0,
  shielddeku: 0,
  shieldmirror: 0,
  ocarina: 0,
  lullaby: 0,
  sarias: 0,
  eponas: 0,
  suns: 0,
  storms: 0,
  time: 0,
  minuet: 0,
  bolero: 0,
  serenade: 0,
  nocturne: 0,
  requiem: 0,
  prelude: 0,
  scarecrow: 0,
  agony: 0,
  bootsiron: 0,
  bootshover: 0,
  scale: 0,
  strength: 0,
  tunicgoron: 0,
  tuniczora: 0,
  skulls: 0,
  gerudocard: 0,
  child_trading: 0,
  adult_trading: 0,
  wallet: 0,
};

const roots: string[] = [childSpawn, adultSpawn, 'prelude_warp', 'minuet_warp', 'bolero_warp', 'serenade_warp', 'nocturne_warp', 'requiem_warp'];

/* Helpers */
function note(note_text:string): boolean {
    return true;
    // Just for leaving notes
}

function isChild(): boolean {
    return age === 'child';
}

function isAdult(): boolean {
    return age === 'adult';
}

function canLeaveForest(): boolean {
    return !!(open_forest || isAdult() || checkStatuses['Queen Gohma']);
}

function hasExplosives(): boolean {
    return !!(inventory.bombs || (bombchus_in_logic && inventory.bombchus));
}

function hasProjectile(for_age:string): boolean {
    if (hasExplosives()) {
        return true
    }
    else if (for_age === 'child') {
        return !!(inventory.slingshot || inventory.boomerang)
    }
    else if (for_age === 'adult') {
        return !!(inventory.bow || inventory.shot)
    }
    else if (for_age === 'both') {
        return !!((inventory.slingshot || inventory.boomerang) && (inventory.bow || inventory.shot))
    }
    else {
        return !!(inventory.slingshot || inventory.boomerang || inventory.bow || inventory.shot)
    }
}

function hasFireSource(): boolean {
    return !!(inventory.magic && (inventory.dins || (inventory.arrowsfire && inventory.bow)))
}

function hasFireSourceWithTorch(): boolean {
    return hasFireSource() || !!(isChild() && inventory.sticks)
}

function canChildAttack(): boolean {
    return !!(inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordkokiri || hasExplosives() || (inventory.magic && inventory.dins));
}

function canJumpslash(): boolean {
    return !!(isAdult() || inventory.sticks || inventory.swordkokiri)
}

function canPlantBugs(): boolean {
    return !!inventory.bottle;
}

function canOpenStormGrotto(): boolean {
    return !!((inventory.ocarina && inventory.storms) && (inventory.agony || logic_grottos_without_agony));
}

function canOpenBombGrotto(): boolean {
    return !!(canBlastOrSmash() && (inventory.agony || logic_grottos_without_agony));
}

function canStunDeku(): boolean {
    return !!(isAdult() || (inventory.shielddeku || inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordkokiri || hasExplosives() || (inventory.magic && inventory.dins) || inventory.nuts));
}

function canRideEpona(): boolean {
    return !!(isAdult() && inventory.eponas && inventory.ocarina);
}

function canTriggerLACS(): boolean {
    return !!(
        (lacs_condition === 'vanilla' && inventory.medallionshadow && inventory.medallionspirit) ||
        (lacs_condition === 'stones' && (inventory.stonekokiri + inventory.stonegoron + inventory.stonezora >= lacs_stones)) ||
        (lacs_condition === 'medallions' && (inventory.medallionlight + inventory.medallionforest + inventory.medallionfire + inventory.medallionwater + inventory.medallionshadow + inventory.medallionspirit >= lacs_medallions)) ||
        (lacs_condition === 'dungeons' && (inventory.stonekokiri + inventory.stonegoron + inventory.stonezora + inventory.medallionlight + inventory.medallionforest + inventory.medallionfire + inventory.medallionwater + inventory.medallionshadow + inventory.medallionspirit >= lacs_rewards)) ||
        (lacs_condition === 'tokens' && (inventory.skulls >= lacs_tokens))
    );
}

function canFinishGerudoFortress(): boolean {
    return !!(
        (gerudo_fortress === 'normal' && inventory.keysfortress > 3 && (isAdult() || inventory.swordkokiri) && (isAdult() && (inventory.bow || inventory.shot || inventory.bootshover) || inventory.gerudocard || logic_gerudo_kitchen))
        || (gerudo_fortress === 'fast' && inventory.keysfortress && (isAdult() || inventory.swordkokiri))
        || (gerudo_fortress != 'normal' && gerudo_fortress != 'fast')
    );
}

function canUseProjectile(): boolean {
    return !!(
        hasExplosives() || 
        (isAdult() && (inventory.bow || inventory.shot)) || 
        (isChild() && (inventory.slingshot || inventory.boomerang))
    );
}

function hasBombchus(): boolean {
    return !!(bombchus_in_logic || inventory.bombs); // && (Buy_Bombchu_5 or Buy_Bombchu_10 or Buy_Bombchu_20 or Bombchu_Drop)
}

function canBlastOrSmash(): boolean {
    return hasExplosives() || (isAdult() && !!inventory.hammer);
}

function canTakeDamage(): boolean {
    // Not yet supported
    // See also (damage_multiplier != 'ohko' or Fairy or can_use(Nayrus_Love))
    return true;
}

function canUseScarecrow(distance='near'): boolean {
    if (isAdult() && inventory.ocarina && inventory.scarecrow) {
        if (distance==='near') {
            return !!inventory.shot
        }
        else {
            return inventory.shot > 1
        }
    }
    else {
        return false
    };
}

function eventCompletable(event: string): boolean {
  // COME BACK
  return true;
}


/* Regions */
interface RuleObj {
  [name: string]: () => boolean;
}
interface Region {
  regionName: string;
  scene: string;
  locations?: RuleObj;
  events?: RuleObj;
  timePasses?: boolean;
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
      'KF GS House of Twins': () => !!(isAdult() && (inventory.shot || (logic_adult_kokiri_gs && inventory.bootshover)))
    },
    exits: {
      'KF Links House': () => true,
      'KF Midos House': () => true,
      'KF Outside Deku Tree': () => isAdult() || open_forest || (inventory.swordkokiri && inventory.shielddeku),
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
      'Kokiri Forest': () => isAdult() || open_forest || (inventory.swordkokiri && inventory.shielddeku),
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
    events: {
      'Sell Skull Mask': () =>  isChild() && !!(inventory.ocarina && inventory.sarias),
      'Can Plant Bean LW Bridge': () => isChild() && !!inventory.beans,
      'Can Open Grotto LW Near Shortcuts': () => canBlastOrSmash()
    },
    locations: {
      'LW Skull Kid': () => isChild() && !!(inventory.ocarina && inventory.sarias),
      'LW Ocarina Memory Game': () => isChild() && !!inventory.ocarina,
      'LW Target in Woods': () => isChild() && !!inventory.slingshot,
      'LW Deku Scrub Near Bridge': () => isChild() && canStunDeku(),
      'LW GS Bean Patch Near Bridge': () => canPlantBugs() || canChildAttack()
    },
    exits: {
      'LW Forest Exit': () => true,
      'GC Woods Warp': () => true, // COME BACK
      'LW Bridge': () => isAdult() && (eventCompletable('Can Plant Bean LW Bridge') || !!inventory.bootshover || inventory.shot > 1 || logic_lost_woods_bridge),
      'Zora River': () => canLeaveForest() && !!(inventory.scale || (isAdult() && inventory.bootsiron)),
      'LW Beyond Mido': () => isChild() || logic_mido_backflip || (inventory.ocarina && inventory.sarias),
      'LW Near Shortcuts Grotto': () => eventCompletable('Can Open Grotto LW Near Shortcuts')
    },
  },
  {
    regionName: 'LW Beyond Mido',
    scene: 'Lost Woods',
    events: {
        'Can Plant Bean LW Deku Theater': () => isChild() && !!inventory.beans,
        'Can Open Grotto LW Near Meadow': () => canBlastOrSmash()
    },
    locations: {
        'LW Deku Scrub Near Deku Theater Right': () => isChild() && canStunDeku(),
        'LW Deku Scrub Near Deku Theater Left': () => isChild() && canStunDeku(),
        'LW GS Above Theater': () => isAdult() && (eventCompletable('Can Plant Bean LW Deku Theater') || (logic_lost_woods_gs_bean && inventory.shot && (inventory.shot > 1 || inventory.bow || hasBombchus() || (inventory.dins && inventory.magic)))),
        'LW GS Bean Patch Near Theater': () => canPlantBugs() && (canChildAttack() || (shuffle_scrubs === false && !!inventory.shielddeku))
    },
    exits: {
        'LW Forest Exit': () => true,
        'Lost Woods': () => isChild() || (inventory.ocarina > 0 && !!inventory.sarias),
        'SFM Entryway': () => true,
        'Deku Theater': () => true,
        'LW Scrubs Grotto': () => eventCompletable('Can Open Grotto LW Near Meadow')
    }
  },
  {
    regionName: 'Lost Woods Mushroom Timeout',
    scene: 'Lost Woods',
    exits: {
        'Lost Woods': () => true
    }
},
{
    regionName: 'SFM Entryway',
    scene: 'Sacred Forest Meadow',
    exits: {
        'LW Beyond Mido': () => true,
        'Sacred Forest Meadow': () => !!(isAdult() || inventory.slingshot || inventory.sticks || inventory.swordkokiri || (inventory.magic && inventory.dins)),
        'SFM Wolfos Grotto': () => canOpenBombGrotto()
    }
},
{
    regionName: 'Sacred Forest Meadow',
    scene: 'Sacred Forest Meadow',
    locations: {
        'Song from Saria': () => isChild() && inventory.child_trading > 2,
        'Sheik in Forest': () => isAdult(),
        'SFM GS': () => isAdult() && !!inventory.shot
    },
    exits: {
        'SFM Entryway': () => true,
        'SFM Forest Temple Entrance Ledge': () => isAdult() && !!inventory.shot,
        'SFM Storms Grotto': () => canOpenStormGrotto()
    }
},
{
    regionName: 'SFM Forest Temple Entrance Ledge',
    scene: 'Sacred Forest Meadow',
    exits: {
        'Sacred Forest Meadow': () => true,
        'Forest Temple Lobby': () => true
    }
},
{
    regionName: 'LW Bridge From Forest',
    scene: 'Lost Woods',
    locations: {
        'LW Gift from Saria': () => true
    },
    exits: {
        'LW Bridge': () => true
    }
},
{
    regionName: 'LW Bridge',
    scene: 'Lost Woods',
    exits: {
        'Kokiri Forest': () => true,
        'Hyrule Field': () => true,
        'Lost Woods': () => isAdult() && inventory.shot > 1
    }
},
{
    regionName: 'Hyrule Field',
    scene: 'Hyrule Field',
    timePasses: true,
    events: {
        'Sell Bunny Hood': () => !!(inventory.stonekokiri && inventory.stonegoron && inventory.stonezora) && isChild(),
        'Can Open Grotto HF': () => canBlastOrSmash()
    },
    locations: {
        'HF Ocarina of Time Item': () => isChild() && !!(inventory.stonekokiri && inventory.stonegoron && inventory.stonezora),
        'Song from Ocarina of Time': () => isChild() && !!(inventory.stonekokiri && inventory.stonegoron && inventory.stonezora),
        'Big Poe Kill': () => isAdult() && !!(inventory.bow && inventory.eponas && inventory.bottle)
    },
    exits: {
        'LW Bridge': () => true,
        'Lake Hylia': () => true,
        'Gerudo Valley': () => true,
        'Market Entrance': () => true,
        'Kakariko Village': () => true,
        'ZR Front': () => true,
        'Lon Lon Ranch': () => true,
        'HF Southeast Grotto': () => eventCompletable('Can Open Grotto HF'),
        'HF Open Grotto': () => true,
        'HF Inside Fence Grotto': () => canOpenBombGrotto(),
        'HF Cow Grotto': () => ((isAdult() && inventory.hammer) || isChild()) && canOpenBombGrotto(),
        'HF Near Market Grotto': () => eventCompletable('Can Open Grotto HF'),
        'HF Near Kak Grotto': () =>  canOpenBombGrotto(),
        'HF Tektite Grotto': () => canOpenBombGrotto()
    }
},
{
    regionName: 'Lake Hylia',
    scene: 'Lake Hylia',
    timePasses: true,
    events: {
        'Bonooru': () => isChild() && inventory.ocarina,
        'Can Plant Bean Lake Hylia': () => isChild() && inventory.beans
    },
    locations: {
        'Pierre': () => isAdult() &&  'isAdult() && Bonooru && not free_scarecrow', // COME BACK
        'LH Underwater Item': () => isChild() && inventory.scale,
        'LH Sun': () => isAdult() && (canUseScarecrow('distant') || eventCompletable('Water Temple Clear')) && inventory.bow,
        'LH Freestanding PoH': () => isAdult() && (canUseScarecrow() || eventCompletable('Can Plant Bean Lake Hylia')),
        'LH GS Bean Patch': () => canPlantBugs() && canChildAttack(),
        'LH GS Lab Wall': () => isChild() && (inventory.boomerang || (logic_lab_wall_gs && (inventory.sticks || inventory.swordkokiri))),
        'LH GS Small Island': () => isChild() && canChildAttack(),
        'LH GS Tree': () => isAdult() && inventory.shot > 1
    },
    exits: {
        'Hyrule Field': () => true,
        'Zoras Domain': () => isChild() && inventory.scale,
        'LH Owl Flight': () => isChild(),
        'LH Lab': () => true,
        'LH Fishing Island': isChild() || canUseScarecrow() || eventCompletable('Can Plant Bean Lake Hylia') || eventCompletable('Water Temple Clear'),
        'Water Temple Lobby': () => isAdult() && inventory.shot && (inventory.bootsiron || (inventory.shot > 1 || logic_water_hookshot_entry) && inventory.scale > 1),
        'LH Grotto': () => true
    }
},
{
    regionName: 'LH Fishing Island',
    scene: 'Lake Hylia',
    exits: {
        'Lake Hylia': () => true,
        'LH Fishing Hole': () => true
    }
},
{
    regionName: 'LH Owl Flight',
    scene: 'Lake Hylia',
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'LH Lab',
    scene: 'LH Lab',
    events: {
        'Eyedrops Access': () => isAdult() && (eventCompletable('Eyeball Frog Access') || (inventory.adult_trading > 8 && disable_trade_revert))
    },
    locations: {
        'LH Lab Dive': () => inventory.scale > 1 || (logic_lab_diving && isAdult() && inventory.bootsiron && inventory.shot),
        'LH GS Lab Crate': () => isAdult() && inventory.bootsiron && inventory.shot
    },
    exits: {
        'Lake Hylia': () => true
    }
},
{
    regionName: 'LH Fishing Hole',
    scene: 'LH Fishing Hole',
    locations: {
        'LH Child Fishing': () => isChild(),
        'LH Adult Fishing': () => isAdult()
    },
    exits: {
        'LH Fishing Island': () => true
    }
},
{
    regionName: 'Gerudo Valley',
    scene: 'Gerudo Valley',
    timePasses: true,
    locations: {
        'GV GS Small Bridge': () => isChild()
    },
    exits: {
        'Hyrule Field': () => true,
        'GV Upper Stream': () => true,
        'GV Crate Ledge': () => isChild() || inventory.shot > 1,
        'GV Grotto Ledge': () => true,
        'GV Fortress Side': () => isAdult() && (canRideEpona() || inventory.shot > 1 || gerudo_fortress === 'open' || eventCompletable('Carpenter Rescue'))
    }
},
{
    regionName: 'GV Upper Stream',
    scene: 'Gerudo Valley',
    timePasses: true,
    locations: {
        'GV Waterfall Freestanding PoH': () => true,
        'GV GS Bean Patch': () => canPlantBugs() && canChildAttack(),
        'GV Cow': () => isChild() && inventory.ocarina && inventory.eponas
    },
    exits: {
        'GV Lower Stream': () => true
    }
},
{
    regionName: 'GV Lower Stream',
    scene: 'Gerudo Valley',
    timePasses: true,
    exits: {
        'Lake Hylia': () => true
    }
},
{
    regionName: 'GV Grotto Ledge',
    scene: 'Gerudo Valley',
    timePasses: true,
    exits: {
        'GV Lower Stream': () => true,
        'GV Octorok Grotto': () => isAdult() && inventory.strength > 1,
        'GV Crate Ledge': () => isAdult() && inventory.shot > 1
    }
},
{
    regionName: 'GV Crate Ledge',
    scene: 'Gerudo Valley',
    timePasses: true,
    locations: {
        'GV Crate Freestanding PoH': () => true
    },
    exits: {
        'GV Lower Stream': () => true
    }
},
{
    regionName: 'GV Fortress Side',
    scene: 'Gerudo Valley',
    timePasses: true,
    events: {
        'Broken Sword Access': () => isAdult() && (eventCompletable('Poachers Saw Access') || inventory.adult_trading === 6)
    },
    locations: {
        'GV Chest': () => isAdult() && inventory.hammer,
        'GV GS Behind Tent': () => isAdult() && inventory.shot,
        'GV GS Pillar': () => isAdult() && inventory.shot
    },
    exits: {
        'Gerudo Fortress': () => true,
        'GV Upper Stream': () => true,
        'GV Crate Ledge': () => isAdult() && logic_valley_crate_hovers && inventory.bootshover && canTakeDamage(),
        'Gerudo Valley': () => isChild() || canRideEpona() || (isAdult() && inventory.shot > 1) ||
            gerudo_fortress === 'open' || eventCompletable('Carpenter Rescue'),
        'GV Carpenter Tent': isAdult(),
        'GV Storms Grotto': () => isAdult() && canOpenStormGrotto()
    }
},
{
    regionName: 'GV Carpenter Tent',
    scene: 'GV Carpenter Tent',
    exits: {
        'GV Fortress Side': () => true
    }
},
{
    regionName: 'Gerudo Fortress',
    scene: 'Gerudo Fortress',
    events: {
        'Carpenter Rescue': () => canFinishGerudoFortress(),
        'GF Gate Open': () => isAdult() && inventory.gerudocard
    },
    locations: {
        'GF Chest': inventory.bootshover || canUseScarecrow() || inventory.shot > 1,
        'GF HBA 1000 Points': () => inventory.gerudocard && canRideEpona() && inventory.bow,
        'GF HBA 1500 Points': () => inventory.gerudocard && canRideEpona() && inventory.bow,
        'GF North F1 Carpenter': () => isAdult() || inventory.swordkokiri,
        'GF North F2 Carpenter': () => (isAdult() || inventory.swordkokiri) && (inventory.gerudocard || logic_gerudo_kitchen || (isAdult() && (inventory.bow || inventory.shot || inventory.bootshover))),
        'GF South F1 Carpenter': () => isAdult() || inventory.swordkokiri,
        'GF South F2 Carpenter': () => isAdult() || inventory.swordkokiri,
        'GF Gerudo Membership Card': () => canFinishGerudoFortress(),
        'GF GS Archery Range': () => isAdult() && inventory.shot && inventory.gerudocard,
        'GF GS Top Floor': () => isAdult() && (inventory.gerudocard || inventory.bow || inventory.shot || inventory.bootshover || logic_gerudo_kitchen)
    },
    exits: {
        'GV Fortress Side': () => true,
        'GF Outside Gate': () => eventCompletable('GF Gate Open'),
        'Gerudo Training Grounds Lobby': () => inventory.gerudocard && isAdult(),
        'GF Storms Grotto': () => isAdult() && canOpenStormGrotto()
    }
},
{
    regionName: 'GF Outside Gate',
    scene: 'Gerudo Fortress',
    exits: {
        'Gerudo Fortress': () => isAdult() || (shuffle_overworld_entrances && eventCompletable('GF Gate Open')),
        'Wasteland Near Fortress': () => true
    }
},
{
    regionName: 'Wasteland Near Fortress',
    scene: 'Haunted Wasteland',
    exits: {
        'GF Outside Gate': () => true,
        'Haunted Wasteland': () => logic_wasteland_crossing || (isAdult() && (inventory.bootshover || inventory.shot > 1))
    }
},
{
    regionName: 'Haunted Wasteland',
    scene: 'Haunted Wasteland',
    locations: {
        'Wasteland Chest': () => hasFireSource(),
        'Wasteland Bombchu Salesman': () => inventory.wallet || (isAdult() || inventory.sticks || inventory.swordkokiri),
        'Wasteland GS': () => (isAdult() && inventory.shot) || (isChild() && inventory.boomerang)
    },
    exits: {
        'Wasteland Near Colossus': logic_lens_wasteland || (inventory.magic && inventory.lens),
        'Wasteland Near Fortress': logic_wasteland_crossing || (isAdult() && (inventory.bootshover || inventory.shot > 1))
    }
},
{
    regionName: 'Wasteland Near Colossus',
    scene: 'Haunted Wasteland',
    exits: {
        'Desert Colossus': () => true,
        'Haunted Wasteland': 'logic_reverse_wasteland'
    }
},
{
    regionName: 'Desert Colossus',
    scene: 'Desert Colossus',
    timePasses: true,
    events: {
        'Can Plant Bean Desert Colossus': () => isChild() && inventory.beans
    },
    locations: {
        'Colossus Freestanding PoH': () => isAdult() && eventCompletable('Can Plant Bean Desert Colossus'),
        'Colossus GS Bean Patch': () => canPlantBugs() && canChildAttack(),
        'Colossus GS Tree': () => isAdult() && inventory.shot,
        'Colossus GS Hill': () => isAdult() && (eventCompletable('Can Plant Bean Desert Colossus') || inventory.shot > 1 || (logic_colossus_gs && inventory.shot))
    },
    exits: {
        'Colossus Great Fairy Fountain': () => hasExplosives(),
        'Spirit Temple Lobby': () => true,
        'Wasteland Near Colossus': () => true,
        'Colossus Grotto': () => isAdult() && inventory.strength > 1
    }
},
{
    regionName: 'Desert Colossus From Spirit Lobby',
    scene: 'Desert Colossus',
    locations: {
        'Sheik at Colossus': () => true
    },
    exits: {
        'Desert Colossus': () => true
    }
},
{
    regionName: 'Colossus Great Fairy Fountain',
    scene: 'Colossus Great Fairy Fountain',
    locations: {
        'Colossus Great Fairy Reward': () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        'Desert Colossus': () => true
    }
},
{
    regionName: 'Market Entrance',
    scene: 'Market Entrance',
    exits: {
        'Hyrule Field': () => true,
        'Market': () => true,
        'Market Guard House': () => true
    }
},
{
    regionName: 'Market',
    scene: 'Market',
    exits: {
        'Market Entrance': () => true,
        'ToT Entrance': () => true,
        'Castle Grounds': () => true,
        'Market Bazaar': () => isChild(),
        'Market Mask Shop': () => isChild(),
        'Market Shooting Gallery': () => isChild(),
        'Market Bombchu Bowling': () => isChild(),
        'Market Potion Shop': () => isChild(),
        'Market Treasure Chest Game': () => isChild(),
        'Market Back Alley': () => isChild()
    }
},
{
    regionName: 'Market Back Alley',
    scene: 'Market',
    exits: {
        'Market': () => true,
        'Market Bombchu Shop': () => true,
        'Market Dog Lady House': () => true,
        'Market Man in Green House': () => true
    }
},
{
    regionName: 'ToT Entrance',
    scene: 'ToT Entrance',
    exits: {
        'Market': () => true,
        'Temple of Time': () => true
    }
},
{
    regionName: 'Temple of Time',
    scene: 'Temple of Time',
    locations: {
        'ToT Light Arrows Cutscene': () => isAdult() && canTriggerLACS()
    },
    exits: {
        'ToT Entrance': () => true,
        'Beyond Door of Time': () => open_door_of_time || (inventory.time && inventory.ocarina)
    }
},
{
    regionName: 'Beyond Door of Time',
    scene: 'Temple of Time',
    locations: {
        'Master Sword Pedestal': () => true,
        'Sheik at Temple': () => inventory.medallionforest && isAdult()
    },
    exits: {
        'Temple of Time': () => true
    }
},
{
    regionName: 'Castle Grounds',
    scene: 'Castle Grounds',
    exits: {
        'Market': () => true,
        'Hyrule Castle Grounds': () => isChild(),
        'Ganons Castle Grounds': () => isAdult()
    }
},
{
    regionName: 'Hyrule Castle Grounds',
    scene: 'Castle Grounds',
    timePasses: true,
    locations: {
        'HC Malon Egg': () => true,
        'HC GS Tree': () => canChildAttack()
    },
    exits: {
        'Castle Grounds': () => true,
        'HC Garden': 'Weird_Egg || skip_child_zelda || (not shuffle_weird_egg)',
        'HC Great Fairy Fountain': () => hasExplosives(),
        'HC Storms Grotto': () => canOpenStormGrotto()
    }
},
{
    regionName: 'HC Garden',
    scene: 'Castle Grounds',
    exits: {
        'HC Garden Locations': () => true,
        'Hyrule Castle Grounds': () => true
    }
},
{
    regionName: 'HC Garden Locations', // Directly reachable from Root in 'Free Zelda'
    scene: 'Castle Grounds',
    locations: {
        'HC Zeldas Letter': () => true,
        'Song from Impa': () => true
    }
},
{
    regionName: 'HC Great Fairy Fountain',
    scene: 'HC Great Fairy Fountain',
    locations: {
        'HC Great Fairy Reward': () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        'Castle Grounds': () => true
    }
},
{
    regionName: 'Ganons Castle Grounds',
    scene: 'Castle Grounds',
    locations: {
        'OGC GS': () => true
    },
    exits: {
        'Castle Grounds': () => true,
        'OGC Great Fairy Fountain': () => isAdult() && inventory.strength > 2,
        'Ganons Castle Lobby': 'can_build_rainbow_bridge && at_dampe_time'
    }
},
{
    regionName: 'OGC Great Fairy Fountain',
    scene: 'OGC Great Fairy Fountain',
    locations: {
        'OGC Great Fairy Reward': () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        'Castle Grounds': () => true
    }
},
{
    regionName: 'Market Guard House',
    scene: 'Market Guard House',
    events: {
        'Sell Big Poe': () => isAdult() && (inventory.bottle || eventCompletable('Big Poe Kill'))
    },
    locations: {
        'Market 10 Big Poes': () => isAdult() && eventCompletable('Big Poe Kill'),
        // COME BACK - do some sort of special logic here? Not currently tracking bottle contents, but if inventory.bottlebigpoe > big_poe_count, this is completable
        'Market GS Guard House': () => isChild()
    },
    exits: {
        'Market Entrance': () => true
    }
},
{
    regionName: 'Market Bazaar',
    scene: 'Market Bazaar',
    locations: {
        'Market Bazaar Item 1': () => true,
        'Market Bazaar Item 2': () => true,
        'Market Bazaar Item 3': () => true,
        'Market Bazaar Item 4': () => true,
        'Market Bazaar Item 5': () => true,
        'Market Bazaar Item 6': () => true,
        'Market Bazaar Item 7': () => true,
        'Market Bazaar Item 8': () => true
    },
    exits: {
        'Market': () => true
    }
},
{
    regionName: 'Market Mask Shop',
    scene: 'Market Mask Shop',
    events: {
        'Skull Mask': () => inventory.child_trading > 2 && (complete_mask_quest || eventCompletable('Sell Keaton Mask')),
        'Mask of Truth': () => eventCompletable(['Skull Mask']) && (complete_mask_quest || (eventCompletable('Sell Skull Mask') && eventCompletable('Sell Spooky Mask') && eventCompletable('Sell Bunny Hood')))
    },
    exits: {
        'Market': () => true
    }
},
{
    regionName: 'Market Shooting Gallery',
    scene: 'Market Shooting Gallery',
    locations: {
        'Market Shooting Gallery Reward': () => isChild()
    },
    exits: {
        'Market': () => true
    }
},
{
    regionName: 'Market Bombchu Bowling',
    scene: 'Market Bombchu Bowling',
    locations: {
        'Market Bombchu Bowling First Prize': 'found_bombchus',
        'Market Bombchu Bowling Second Prize': 'found_bombchus',
        'Market Bombchu Bowling Bombchus': 'found_bombchus'
    },
    exits: {
        'Market': () => true
    }
},
{
    regionName: 'Market Potion Shop',
    scene: 'Market Potion Shop',
    locations: {
        'Market Potion Shop Item 1': () => true,
        'Market Potion Shop Item 2': () => true,
        'Market Potion Shop Item 3': () => true,
        'Market Potion Shop Item 4': () => true,
        'Market Potion Shop Item 5': () => true,
        'Market Potion Shop Item 6': () => true,
        'Market Potion Shop Item 7': () => true,
        'Market Potion Shop Item 8': () => true
    },
    exits: {
        'Market': () => true
    }
},
{
    regionName: 'Market Treasure Chest Game',
    scene: 'Market Treasure Chest Game',
    locations: {
        'Market Treasure Chest Game Reward': '(inventory.lens && inventory.magic)'
    },
    exits: {
        'Market': () => true
    }
},
{
    regionName: 'Market Bombchu Shop',
    scene: 'Market Bombchu Shop',
    locations: {
        'Market Bombchu Shop Item 1': () => true,
        'Market Bombchu Shop Item 2': () => true,
        'Market Bombchu Shop Item 3': () => true,
        'Market Bombchu Shop Item 4': () => true,
        'Market Bombchu Shop Item 5': () => true,
        'Market Bombchu Shop Item 6': () => true,
        'Market Bombchu Shop Item 7': () => true,
        'Market Bombchu Shop Item 8': () => true
    },
    exits: {
        'Market Back Alley': () => true
    }
},
{
    regionName: 'Market Dog Lady House',
    scene: 'Market Dog Lady House',
    locations: {
        'Market Lost Dog': 'isChild() && at_night'
    },
    exits: {
        'Market Back Alley': () => true
    }
},
{
    regionName: 'Market Man in Green House',
    scene: 'Market Man in Green House',
    exits: {
        'Market Back Alley': () => true
    }
},
{
    regionName: 'Kakariko Village',
    scene: 'Kakariko Village',
    events: {
        'Cojiro Access': () => isAdult() && eventCompletable('Wake Up Adult Talon'),
        'Kakariko Village Gate Open': () => isChild() && (inventory.child_trading > 2 || open_kakariko === 'open'),
        'Sell Keaton Mask': () => isChild()
    },
    locations: {
        'Sheik in Kakariko': () => isAdult() && inventory.medallionforest && inventory.medallionfire && inventory.medallionwater,
        'Kak Anju as Adult': () => isAdult(),
        'Kak Anju as Child': () => isChild(),
        'Kak GS House Under Construction': () => isChild(),
        'Kak GS Skulltula House': () => isChild(),
        'Kak GS Guards House': () => isChild(),
        'Kak GS Tree': () => isChild(),
        'Kak GS Watchtower': () => isChild() && (inventory.slingshot || hasBombchus() || (logic_kakariko_tower_gs && (inventory.sticks || inventory.swordkokiri) && canTakeDamage()))
    },
    exits: {
        'Hyrule Field': () => true,
        'Kak Carpenter Boss House': () => true,
        'Kak House of Skulltula': () => true,
        'Kak Impas House': () => true,
        'Kak Windmill': () => true,
        'Kak Bazaar': () => isAdult(),
        'Kak Shooting Gallery': () => isAdult(),
        'Bottom of the Well': () => eventCompletable('Drain Well') && (isChild() || shuffle_dungeon_entrances),
        'Kak Potion Shop Front': () => true,
        'Kak Redead Grotto': () => canOpenBombGrotto(),
        'Kak Impas Ledge': () => isChild() || (isAdult() && logic_visible_collisions),
        'Kak Impas Rooftop': () => isAdult() && inventory.shot > 1 || (logic_kakariko_rooftop_gs && inventory.bootshover),
        'Kak Odd Medicine Rooftop': () => (isAdult() && inventory.shot > 1) || logic_man_on_roof,
        'Kak Backyard': () => true,
        'Graveyard': () => true,
        'Kak Behind Gate': () => isAdult() || eventCompletable('Kakariko Village Gate Open')
    }
},
{
    regionName: 'Kak Impas Ledge',
    scene: 'Kakariko Village',
    exits: {
        'Kak Impas House Back': () => true,
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Impas Rooftop',
    scene: 'Kakariko Village',
    locations: {
        'Kak GS Above Impas House': () => isAdult()
    },
    exits: {
        'Kak Impas Ledge': () => true,
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Odd Medicine Rooftop',
    scene: 'Kakariko Village',
    locations: {
        'Kak Man on Roof': () => true
    },
    exits: {
        'Kakariko Village': () => true,
        'Kak Backyard': () => true
    }
},
{
    regionName: 'Kak Backyard',
    scene: 'Kakariko Village',
    exits: {
        'Kakariko Village': () => true,
        'Kak Open Grotto': () => true,
        'Kak Odd Medicine Building': () => isAdult(),
        'Kak Potion Shop Back': () => isAdult()
    }
},
{
    regionName: 'Kak Carpenter Boss House',
    scene: 'Kak Carpenter Boss House',
    events: {
        'Wake Up Adult Talon': () => isAdult() && (inventory.adult_trading === 1 || inventory.adult_trading === 2)
    },
    exits: {
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak House of Skulltula',
    scene: 'Kak House of Skulltula',
    locations: {
        'Kak 10 Gold Skulltula Reward': () => inventory.skulls > 9,
        'Kak 20 Gold Skulltula Reward': () => inventory.skulls > 19,
        'Kak 30 Gold Skulltula Reward': () => inventory.skulls > 29,
        'Kak 40 Gold Skulltula Reward': () => inventory.skulls > 39,
        'Kak 50 Gold Skulltula Reward': () => inventory.skulls > 49
    },
    exits: {
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Impas House',
    scene: 'Kak Impas House',
    exits: {
        'Kakariko Village': () => true,
        'Kak Impas House Near Cow': () => true
    }
},
{
    regionName: 'Kak Impas House Back',
    scene: 'Kak Impas House',
    locations: {
        'Kak Impas House Freestanding PoH': () => true
    },
    exits: {
        'Kak Impas Ledge': () => true,
        'Kak Impas House Near Cow': () => true
    }
},
{
    regionName: 'Kak Impas House Near Cow',
    locations: {
        'Kak Impas House Cow': () => inventory.ocarina && inventory.eponas
    }
},
{
    regionName: 'Kak Windmill',
    scene: 'Windmill && Dampes Grave',
    events: {
        'Drain Well': 'isChild() && (inventory.storms && inventory.ocarina)' // COME BACK - Make this a check to get to BotW
    },
    locations: {
        'Kak Windmill Freestanding PoH': () => (isChild() && inventory.boomerang) || (logic_windmill_poh && isAdult()) || eventCompletable('Dampes Windmill Access'),
        'Song from Windmill': () => isAdult() && inventory.ocarina
    },
    exits: {
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Bazaar',
    scene: 'Kak Bazaar',
    locations: {
        'Kak Bazaar Item 1': () => true,
        'Kak Bazaar Item 2': () => true,
        'Kak Bazaar Item 3': () => true,
        'Kak Bazaar Item 4': () => true,
        'Kak Bazaar Item 5': () => true,
        'Kak Bazaar Item 6': () => true,
        'Kak Bazaar Item 7': () => true,
        'Kak Bazaar Item 8': () => true
    },
    exits: {
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Shooting Gallery',
    scene: 'Kak Shooting Gallery',
    locations: {
        'Kak Shooting Gallery Reward': () => isAdult() && inventory.bow
    },
    exits: {
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Potion Shop Front',
    scene: 'Kak Potion Shop Front',
    locations: {
        'Kak Potion Shop Item 1': () => isAdult(),
        'Kak Potion Shop Item 2': () => isAdult(),
        'Kak Potion Shop Item 3': () => isAdult(),
        'Kak Potion Shop Item 4': () => isAdult(),
        'Kak Potion Shop Item 5': () => isAdult(),
        'Kak Potion Shop Item 6': () => isAdult(),
        'Kak Potion Shop Item 7': () => isAdult(),
        'Kak Potion Shop Item 8': () => isAdult(),
    },
    exits: {
        'Kakariko Village': () => true,
        'Kak Potion Shop Back': () => isAdult()
    }
},
{
    regionName: 'Kak Potion Shop Back',
    scene: 'Kak Potion Shop Back',
    exits: {
        'Kak Backyard': () => isAdult(),
        'Kak Potion Shop Front': () => true
    }
},
{
    regionName: 'Kak Odd Medicine Building',
    scene: 'Kak Odd Medicine Building',
    events: {
        'Odd Potion Access': () => isAdult() && inventory.adult_trading === 4 && disable_trade_revert
    },
    exits: {
        'Kak Backyard': () => true
    }
},
{
    regionName: 'Graveyard',
    scene: 'Graveyard',
    events: {
        'Sell Skull Mask': () => isChild(),
        'Can Plant Bean Graveyard': () => isChild() && inventory.beans
    },
    locations: {
        'Graveyard Freestanding PoH': () => (isAdult() && (eventCompletable('Can Plant Bean Graveyard') || inventory.shot > 1)) || (logic_graveyard_poh && isChild() && inventory.boomerang),
        'Graveyard Dampe Gravedigging Tour': () => isChild(),
        'Graveyard GS Wall': () => isChild() && inventory.boomerang,
        'Graveyard GS Bean Patch': () => canPlantBugs() && canChildAttack()
    },
    exits: {
        'Graveyard Shield Grave': () => true,
        'Graveyard Composers Grave': () => inventory.lullaby && inventory.ocarina,
        'Graveyard Heart Piece Grave': () => true,
        'Graveyard Dampes Grave': () => isAdult(),
        'Graveyard Dampes House': () => true,
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Graveyard Shield Grave',
    scene: 'Graveyard Shield Grave',
    locations: {
        'Graveyard Shield Grave Chest': () => true
    },
    exits: {
        'Graveyard': () => true
    }
},
{
    regionName: 'Graveyard Heart Piece Grave',
    scene: 'Graveyard Heart Piece Grave',
    locations: {
        'Graveyard Heart Piece Grave Chest': () => inventory.suns && inventory.ocarina
    },
    exits: {
        'Graveyard': () => true
    }
},
{
    regionName: 'Graveyard Composers Grave',
    scene: 'Graveyard Composers Grave',
    locations: {
        'Graveyard Composers Grave Chest': () => hasFireSource(),
        'Song from Composers Grave': () => isAdult() || (inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordkokiri || hasExplosives())
    },
    exits: {
        'Graveyard': () => true
    }
},
{
    regionName: 'Graveyard Dampes Grave',
    scene: 'Windmill && Dampes Grave',
    events: {
        'Dampes Windmill Access': () => isAdult() && inventory.time && inventory.ocarina
    },
    locations: {
        'Graveyard Hookshot Chest': () => true,
        'Graveyard Dampe Race Freestanding PoH': () => isAdult() || logic_child_dampe_race_poh
    },
    exits: {
        'Graveyard': () => true,
        'Kak Windmill': () => isAdult() && (inventory.time && inventory.ocarina)
    }
},
{
    regionName: 'Graveyard Dampes House',
    scene: 'Graveyard Dampes House',
    exits: {
        'Graveyard': () => true
    }
},
{
    regionName: 'Graveyard Warp Pad Region',
    scene: 'Graveyard',
    exits: {
        'Graveyard': () => true,
        'Shadow Temple Entryway': () => (inventory.dins && inventory.magic) || (logic_shadow_fire_arrow_entry && isAdult() && inventory.bow && inventory.arrowsfire && inventory.magic)
    }
},
{
    regionName: 'Kak Behind Gate',
    scene: 'Kakariko Village',
    exits: {
        'Kakariko Village': () => isAdult() || logic_visible_collisions || eventCompletable('Kakariko Village Gate Open') || open_kakariko === 'open',
        'Death Mountain': () => true
    }
},
{
    regionName: 'Death Mountain',
    scene: 'Death Mountain',
    timePasses: true,
    events: {
        'Can Plant Bean Death Mountain Trail': () => isChild() && inventory.beans && (hasExplosives() || inventory.strength),
        'Can Open Summit': () => canBlastOrSmash()
    },
    locations: {
        'DMT Chest': () => canBlastOrSmash() || (logic_dmt_bombable && isChild() && inventory.strength),
        'DMT Freestanding PoH': () => canTakeDamage() || (isAdult() && (inventory.bootshover || eventCompletable('Can Plant Bean Death Mountain Trail'))),
        'DMT GS Bean Patch': () => canPlantBugs() && canChildAttack() && (hasExplosives() || inventory.strength || (logic_dmt_soil_gs && (isChild() && inventory.boomerang))),
        'DMT GS Near Kak': () => canBlastOrSmash(),
        'DMT GS Above Dodongos Cavern': () => isAdult() && (inventory.hammer || (logic_trail_gs_lower_hookshot && inventory.shot) || (logic_trail_gs_lower_hovers && inventory.bootshover) || (logic_trail_gs_lower_bean && eventCompletable('Can Plant Bean Death Mountain Trail')))
    },
    exits: {
        'Kak Behind Gate': () => true,
        'Goron City': () => true,
        'Death Mountain Summit': () => eventCompletable('Can Open Summit') || (isAdult() && (eventCompletable('Can Plant Bean Death Mountain Trail') || (logic_dmt_climb_hovers && inventory.bootshover))),
        'Dodongos Cavern Beginning': () => hasExplosives() || inventory.strength || isAdult(),
        'DMT Storms Grotto': () => canOpenStormGrotto()
    }
},
{
    regionName: 'Death Mountain Summit',
    scene: 'Death Mountain',
    timePasses: true,
    events: {
        'Prescription Access': () => isAdult() && (eventCompletable('Broken Sword Access') || inventory.adult_trading === 7)
    },
    locations: {
        'DMT Biggoron': () => isAdult() && (inventory.adult_trading === 11 || (guarantee_trade_path && (eventCompletable('Eyedrops Access') || (inventory.adult_trading === 10 && disable_trade_revert)))),
        'DMT GS Falling Rocks Path': () => isAdult() && (inventory.hammer || logic_trail_gs_upper)
    },
    exits: {
        'Death Mountain': () => true,
        'DMC Upper Local': () => true,
        'DMT Owl Flight': () => isChild(),
        'DMT Cow Grotto': () => canBlastOrSmash(),
        'DMT Great Fairy Fountain': () => canBlastOrSmash()
    }
},
{
    regionName: 'DMT Owl Flight',
    scene: 'Death Mountain',
    exits: {
        'Kak Impas Rooftop': () => true
    }
},
{
    regionName: 'Goron City',
    scene: 'Goron City',
    events: {
        'Goron City Child Fire': isChild() && inventory.dins && inventory.magic,
        'GC Woods Warp Open': () => canBlastOrSmash() || (inventory.dins && inventory.magic) || (isAdult() && inventory.bow) || inventory.strength || eventCompletable('Goron City Child Fire'),
        'Stop GC Rolling Goron as Adult': () => isAdult() && (inventory.strength || hasExplosives() || inventory.bow || (logic_link_goron_dins && inventory.dins && inventory.magic))
    },
    locations: {
        'GC Maze Left Chest': () => isAdult() && (inventory.hammer || inventory.strength > 1 || (logic_goron_city_leftmost && hasExplosives() && inventory.bootshover)),
        'GC Maze Center Chest': () => canBlastOrSmash() || (isAdult() && inventory.strength > 1),
        'GC Maze Right Chest': () => canBlastOrSmash() || (isAdult() && inventory.strength > 1),
        'GC Pot Freestanding PoH': () => isChild() && eventCompletable('Goron City Child Fire') && (inventory.bombs || (inventory.strength && logic_goron_city_pot_with_strength) || (hasBombchus() && logic_goron_city_pot)),
        'GC Rolling Goron as Child': () => isChild() && (hasExplosives() || (inventory.strength && logic_child_rolling_with_strength)),
        'GC Medigoron': () => isAdult() && inventory.wallet > 1 && (canBlastOrSmash() || inventory.strength),
        'GC Rolling Goron as Adult': () => eventCompletable('Stop GC Rolling Goron as Adult'),
        'GC GS Boulder Maze': () => isChild() && hasExplosives(),
        'GC GS Center Platform': () => isAdult()
    },
    exits: {
        'Death Mountain': () => true,
        'GC Woods Warp': () => eventCompletable('GC Woods Warp Open'),
        'GC Shop': () => (isAdult() && eventCompletable('Stop GC Rolling Goron as Adult')) || (isChild() && (hasExplosives() || inventory.strength || eventCompletable('Goron City Child Fire'))),
        'GC Darunias Chamber': () => (isAdult() && eventCompletable('Stop GC Rolling Goron as Adult')) || (isChild() && (inventory.lullaby && inventory.ocarina)),
        'GC Grotto Platform': () => 
            isAdult() && 
            (((inventory.time && inventory.ocarina) && 
                    ((damage_multiplier != 'ohko' && damage_multiplier != 'quadruple') || 
                        inventory.tunicgoron || inventory.shot > 1 || (inventory.nayrus && inventory.magic))) || 
                (inventory.shot && 
                    ((damage_multiplier != 'ohko' && inventory.tunicgoron) ||
                        (inventory.nayrus && inventory.magic) ||
                        (damage_multiplier != 'ohko' && damage_multiplier != 'quadruple' && logic_goron_grotto)))) // yikes
    }
},
{
    regionName: 'GC Woods Warp',
    scene: 'Goron City',
    events: {
        'GC Woods Warp Open': () => canBlastOrSmash() || (inventory.dins && inventory.magic)
    },
    exits: {
        'Goron City': () => canLeaveForest() && eventCompletable('GC Woods Warp Open'),
        'Lost Woods': () => true
    }
},
{
    regionName: 'GC Darunias Chamber',
    scene: 'Goron City',
    events: {
        'Goron City Child Fire': () => isChild() && inventory.sticks
    },
    locations: {
        'GC Darunias Joy': () => isChild() && (inventory.sarias && inventory.ocarina)
    },
    exits: {
        'Goron City': () => true,
        'DMC Lower Local': () => isAdult()
    }
},
{
    regionName: 'GC Grotto Platform',
    scene: 'Goron City',
    exits: {
        'GC Grotto': () => true,
        'Goron City': () => (damage_multiplier != 'ohko' && damage_multiplier != 'quadruple') || (isAdult() && (inventory.tunicgoron || (inventory.time && inventory.ocarina && inventory.shot > 1) || (inventory.nayrus && inventory.magic)))
    }
},
{
    regionName: 'GC Shop',
    scene: 'GC Shop',
    locations: {
        'GC Shop Item 1': () => true,
        'GC Shop Item 2': () => true,
        'GC Shop Item 3': () => true,
        'GC Shop Item 4': () => true,
        'GC Shop Item 5': () => true,
        'GC Shop Item 6': () => true,
        'GC Shop Item 7': () => true,
        'GC Shop Item 8': () => true
    },
    exits: {
        'Goron City': () => true
    }
},
{
    regionName: 'DMC Upper Nearby',
    scene: 'Death Mountain Crater',
    events: {
        'Can Open DMC Upper Grotto': canBlastOrSmash()
    },
    exits: {
        'DMC Upper Local': () => isAdult() && inventory.tunicgoron,
        'Death Mountain Summit': () => true,
        'DMC Upper Grotto': eventCompletable('Can Open DMC Upper Grotto')
    }
},
{
    regionName: 'DMC Upper Local',
    scene: 'Death Mountain Crater',
    locations: {
        'DMC Wall Freestanding PoH': () => true,
        'DMC GS Crate': () => isChild() && canChildAttack()
    },
    exits: {
        'DMC Upper Nearby': () => true,
        'DMC Ladder Area Nearby': () => true,
        'DMC Central Nearby': () => isAdult() && inventory.tunicgoron && inventory.shot > 1 && ((damage_multiplier != 'ohko' && damage_multiplier != 'quadruple') || (inventory.bottle && entrance_shuffle === false) || (inventory.nayrus && inventory.magic))
    }
},
{
    regionName: 'DMC Ladder Area Nearby',
    scene: 'Death Mountain Crater',
    locations: {
        'DMC Deku Scrub': () => isChild() && canStunDeku()
    },
    exits: {
        'DMC Upper Nearby': () => isAdult(),
        'DMC Lower Nearby': () => isAdult() && (inventory.bootshover || (logic_crater_upper_to_lower && inventory.hammer))
    }
},
{
    regionName: 'DMC Lower Nearby',
    scene: 'Death Mountain Crater',
    exits: {
        'DMC Lower Local': () => isAdult() && inventory.tunicgoron,
        'GC Darunias Chamber': () => true,
        'DMC Great Fairy Fountain': () => isAdult() && inventory.hammer,
        'DMC Hammer Grotto': () => isAdult() && inventory.hammer
    }
},
{
    regionName: 'DMC Lower Local',
    scene: 'Death Mountain Crater',
    exits: {
        'DMC Lower Nearby': () => true,
        'DMC Ladder Area Nearby': () => true,
        'DMC Central Nearby': () => isAdult() && (inventory.bootshover || inventory.shot),
        'DMC Fire Temple Entrance': () => isAdult() && (inventory.bootshover || inventory.shot) && (logic_fewer_tunic_requirements || inventory.tunicgoron)
    }
},
{
    regionName: 'DMC Central Nearby',
    scene: 'Death Mountain Crater',
    locations: {
        'DMC Volcano Freestanding PoH': () => isAdult() && (eventCompletable('Can Plant Bean DMC') || (logic_crater_bean_poh_with_hovers && inventory.bootshover)),
        'Sheik in Crater': () => isAdult()
    },
    exits: {
        'DMC Central Local': () => isAdult() && inventory.tunicgoron
    }
},
{
    regionName: 'DMC Central Local',
    scene: 'Death Mountain Crater',
    events: {
        'Can Plant Bean DMC': () => isChild() && inventory.beans
    },
    locations: {
        'DMC GS Bean Patch': () => canPlantBugs() && canChildAttack(),
    },
    exits: {
        'DMC Central Nearby': () => true,
        'DMC Lower Nearby': () => isAdult() && (inventory.bootshover || inventory.shot || eventCompletable('Can Plant Bean DMC')),
        'DMC Upper Nearby': () => isAdult() && eventCompletable('Can Plant Bean DMC'),
        'DMC Fire Temple Entrance': () => isAdult() && (logic_fewer_tunic_requirements || inventory.tunicgoron)
    }
},
{
    regionName: 'DMC Fire Temple Entrance',
    scene: 'Death Mountain Crater',
    exits: {
        'Fire Temple Lower': () => true,
        'DMC Central Nearby': () => isAdult() && inventory.tunicgoron
    }
},
{
    regionName: 'DMC Great Fairy Fountain',
    scene: 'DMC Great Fairy Fountain',
    locations: {
        'DMC Great Fairy Reward': () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        'DMC Lower Local': () => true
    }
},
{
    regionName: 'DMT Great Fairy Fountain',
    scene: 'DMT Great Fairy Fountain',
    locations: {
        'DMT Great Fairy Reward': () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        'Death Mountain Summit': () => true
    }
},
{
    regionName: 'ZR Front',
    scene: 'Zora River',
    timePasses: true,
    locations: {
        'ZR GS Tree': () => isChild() && canChildAttack()
    },
    exits: {
        'Zora River': () => isAdult() || hasExplosives(),
        'Hyrule Field': () => true
    }
},
{
    regionName: 'Zora River',
    scene: 'Zora River',
    timePasses: true,
    locations: {
        'ZR Magic Bean Salesman': () => isChild(),
        'ZR Frogs Ocarina Game': () => isChild() && inventory.lullaby && inventory.sarias && inventory.suns && inventory.eponas && inventory.time && inventory.storms && inventory.ocarina,
        'ZR Frogs in the Rain': () => isChild() && (inventory.storms && inventory.ocarina),
        'ZR Near Open Grotto Freestanding PoH': () => isChild() || (isAdult() && (inventory.bootshover || logic_zora_river_lower)),
        'ZR Near Domain Freestanding PoH': () => isChild() || (isAdult() && (inventory.bootshover || logic_zora_river_upper)),
        'ZR GS Ladder': () => isChild() && canChildAttack(),
        'ZR GS Near Raised Grottos': () => isAdult() && inventory.shot,
        'ZR GS Above Bridge': () => isAdult() && inventory.shot
    },
    exits: {
        'ZR Front': () => true,
        'ZR Open Grotto': () => true,
        'Lost Woods': () => inventory.scale || (isAdult() && inventory.bootshover),
        'ZR Storms Grotto': () => canOpenStormGrotto(),
        'ZR Behind Waterfall': () => (inventory.lullaby && inventory.ocarina) || (isAdult() && inventory.bootshover && logic_zora_with_hovers) || (isChild() && logic_zora_with_cucco)
    }
},
{
    regionName: 'ZR Behind Waterfall',
    scene: 'Zora River',
    exits: {
        'Zora River': () => true,
        'Zoras Domain': () => true
    }
},
{
    regionName: 'ZR Top of Waterfall',
    scene: 'Zora River',
    exits: {
        'Zora River': () => true
    }
},
{
    regionName: 'Zoras Domain',
    scene: 'Zoras Domain',
    events: {
        'King Zora Thawed': () => isAdult() && inventory.bottle, // 'Blue_Fire'
        'Eyeball Frog Access': () => isAdult() && eventCompletable('King Zora Thawed') && (inventory.adult_trading === 8 || inventory.adult_trading === 9 || inventory.adult_trading === 10 || eventCompletable('Prescription Access'))
    },
    locations: {
        'ZD Diving Minigame': () => isChild(),
        'ZD Chest': () => isChild() && inventory.sticks,
        'Deliver Rutos Letter': inventory.rutos && isChild() && zora_fountain != 'open',
        'ZD King Zora Thawed': eventCompletable('King Zora Thawed'),
        'ZD GS Frozen Waterfall': () => isAdult() || (inventory.shot || inventory.bow || inventory.magic || logic_domain_gs)
    },
    exits: {
        'ZR Behind Waterfall': () => true,
        'Lake Hylia': () => isChild() && inventory.scale,
        'ZD Behind King Zora': () => checkStatuses['Deliver Rutos Letter'] || zora_fountain == 'open' || (zora_fountain === 'adult' && isAdult()),
        'ZD Shop': () => isChild() || inventory.bottle, // 'Blue_Fire'
        'ZD Storms Grotto': () => canOpenStormGrotto()
    }
},
{
    regionName: 'ZD Behind King Zora',
    scene: 'Zoras Domain',
    exits: {
        'Zoras Domain': () => checkStatuses['Deliver Rutos Letter'] || zora_fountain === 'open' || (zora_fountain === 'adult' && isAdult()),
        'Zoras Fountain': () => true
    }
},
{
    regionName: 'ZD Eyeball Frog Timeout',
    scene: 'Zoras Domain',
    exits: {
        'Zoras Domain': () => true
    }
},
{
    regionName: 'Zoras Fountain',
    scene: 'Zoras Fountain',
    locations: {
        'ZF Iceberg Freestanding PoH': () => isAdult(),
        'ZF Bottom Freestanding PoH': () => isAdult() && inventory.bootsiron && (logic_fewer_tunic_requirements || inventory.tuniczora),
        'ZF GS Tree': () => isChild(),
        'ZF GS Above the Log': () => isChild() && inventory.boomerang,
        'ZF GS Hidden Cave': () => isAdult() && inventory.strength > 1 && canBlastOrSmash() && inventory.shot
    },
    exits: {
        'ZD Behind King Zora': () => true,
        'Jabu Jabus Belly Beginning': () => isChild() && inventory.bottle, // 'Fish'
        'ZF Ice Ledge': () => isAdult(),
        'ZF Great Fairy Fountain': () => hasExplosives()
    }
},
{
    regionName: 'ZF Ice Ledge',
    scene: 'Zoras Fountain',
    exits: {
        'Zoras Fountain': () => true,
        'Ice Cavern Beginning': () => true
    }
},
{
    regionName: 'ZD Shop',
    scene: 'ZD Shop',
    locations: {
        'ZD Shop Item 1': () => true,
        'ZD Shop Item 2': () => true,
        'ZD Shop Item 3': () => true,
        'ZD Shop Item 4': () => true,
        'ZD Shop Item 5': () => true,
        'ZD Shop Item 6': () => true,
        'ZD Shop Item 7': () => true,
        'ZD Shop Item 8': () => true
    },
    exits: {
        'Zoras Domain': () => true
    }
},
{
    regionName: 'ZF Great Fairy Fountain',
    scene: 'ZF Great Fairy Fountain',
    locations: {
        'ZF Great Fairy Reward': () => inventory.lullaby && inventory.ocarina
    },
    exits: {
        'Zoras Fountain': () => true
    }
},
{
    regionName: 'Lon Lon Ranch',
    scene: 'Lon Lon Ranch',
    events: {
        'Epona': () => isAdult() && inventory.eponas && inventory.ocarina,
        'Links Cow': () => isAdult() && inventory.eponas && inventory.ocarina
    },
    locations: {
        'Song from Malon': () => isChild() && inventory.child_trading > 2 && inventory.ocarina,
        'LLR GS Tree': () => isChild(),
        'LLR GS Rain Shed': () => isChild(),
        'LLR GS House Window': () => isChild() && inventory.boomerang,
        'LLR GS Back Wall': () => isChild() && inventory.boomerang
    },
    exits: {
        'Hyrule Field': () => true,
        'LLR Talons House': () => true,
        'LLR Stables': () => true,
        'LLR Tower': () => true,
        'LLR Grotto': () => isChild()
    }
},
{
    regionName: 'LLR Talons House',
    scene: 'LLR Talons House',
    locations: {
        'LLR Talons Chickens': () => isChild() && inventory.child_trading > 2
    },
    exits: {
        'Lon Lon Ranch': () => true
    }
},
{
    regionName: 'LLR Stables',
    scene: 'LLR Stables',
    locations: {
        'LLR Stables Left Cow': () => inventory.eponas && inventory.ocarina,
        'LLR Stables Right Cow': () => inventory.eponas && inventory.ocarina
    },
    exits: {
        'Lon Lon Ranch': () => true
    }
},
{
    regionName: 'LLR Tower',
    scene: 'LLR Tower',
    locations: {
        'LLR Freestanding PoH': () => isChild(),
        'LLR Tower Left Cow': () => inventory.eponas && inventory.ocarina,
        'LLR Tower Right Cow': () => inventory.eponas && inventory.ocarina
    },
    exits: {
        'Lon Lon Ranch': () => true
    }
},
{
    regionName: 'Ganons Castle Tower',
    dungeon: 'Ganons Castle',
    locations: {
        'Ganons Tower Boss Key Chest': () => true,
        'Ganon': () => inventory.bosskeyganon && inventory.bow && inventory.arrowslight
    }
},
{
    regionName: 'GF Storms Grotto',
    scene: 'GF Storms Grotto',
    exits: {
        'Gerudo Fortress': () => true
    }
},
{
    regionName: 'ZD Storms Grotto',
    scene: 'ZD Storms Grotto',
    exits: {
        'Zoras Domain': () => true
    }
},
{
    regionName: 'KF Storms Grotto',
    scene: 'KF Storms Grotto',
    locations: {
        'KF Storms Grotto Chest': () => true
    },
    exits: {
        'Kokiri Forest': () => true
    }
},
{
    regionName: 'LW Near Shortcuts Grotto',
    scene: 'LW Near Shortcuts Grotto',
    locations: {
        'LW Near Shortcuts Grotto Chest': () => true
    },
    exits: {
        'Lost Woods': () => true
    }
},
{
    regionName: 'Deku Theater',
    scene: 'Deku Theater',
    locations: {
        'Deku Theater Skull Mask': () => isChild() && inventory.child_trading === 5,
        'Deku Theater Mask of Truth': () => isChild() && inventory.child_trading === 7
    },
    exits: {
        'LW Beyond Mido': () => true
    }
},
{
    regionName: 'LW Scrubs Grotto',
    scene: 'LW Scrubs Grotto',
    locations: {
        'LW Deku Scrub Grotto Rear': () => canStunDeku(),
        'LW Deku Scrub Grotto Front': () => canStunDeku()
    },
    exits: {
        'LW Beyond Mido': () => true
    }
},
{
    regionName: 'SFM Storms Grotto',
    scene: 'SFM Storms Grotto',
    locations: {
        'SFM Deku Scrub Grotto Rear': () => canStunDeku(),
        'SFM Deku Scrub Grotto Front': () => canStunDeku()
    },
    exits: {
        'Sacred Forest Meadow': () => true
    }
},
{
    regionName: 'SFM Wolfos Grotto',
    scene: 'SFM Wolfos Grotto',
    locations: {
        'SFM Wolfos Grotto Chest': () => isAdult() || inventory.slingshot || inventory.sticks || (inventory.magic && inventory.dins)
    },
    exits: {
        'SFM Entryway': () => true
    }
},
{
    regionName: 'LLR Grotto',
    scene: 'LLR Grotto',
    locations: {
        'LLR Deku Scrub Grotto Left': () => canStunDeku(),
        'LLR Deku Scrub Grotto Right': () => canStunDeku(),
        'LLR Deku Scrub Grotto Center': () => canStunDeku()
    },
    exits: {
        'Lon Lon Ranch': () => true
    }
},
{
    regionName: 'HF Southeast Grotto',
    scene: 'HF Southeast Grotto',
    locations: {
        'HF Southeast Grotto Chest': () => true
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HF Open Grotto',
    scene: 'HF Open Grotto',
    locations: {
        'HF Open Grotto Chest': () => true
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HF Inside Fence Grotto',
    scene: 'HF Inside Fence Grotto',
    locations: {
        'HF Deku Scrub Grotto': () => canStunDeku()
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HF Cow Grotto',
    scene: 'HF Cow Grotto',
    locations: {
        'HF GS Cow Grotto': () => hasFireSource() && ((isAdult() && inventory.shot) || (isChild() && inventory.boomerang)),
        'HF Cow Grotto Cow': () => hasFireSource() && inventory.eponas && inventory.ocarina
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HF Near Market Grotto',
    scene: 'HF Near Market Grotto',
    locations: {
        'HF Near Market Grotto Chest': () => true
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HF Near Kak Grotto',
    scene: 'HF Near Kak Grotto',
    locations: {
        'HF GS Near Kak Grotto': () => ((isChild() && inventory.boomerang) || (isAdult() && inventory.shot))
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HF Tektite Grotto',
    scene: 'HF Tektite Grotto',
    locations: {
        'HF Tektite Grotto Freestanding PoH': () => inventory.scale > 1 || (isAdult() && inventory.bootsiron)
    },
    exits: {
        'Hyrule Field': () => true
    }
},
{
    regionName: 'HC Storms Grotto',
    scene: 'HC Storms Grotto',
    locations: {
        'HC GS Storms Grotto': () => (canBlastOrSmash() || (isChild() && logic_castle_storms_gs)) && ((isChild() && inventory.boomerang) || (isAdult() && inventory.shot))
    },
    exits: {
        'Castle Grounds': () => true
    }
},
{
    regionName: 'Kak Redead Grotto',
    scene: 'Kak Redead Grotto',
    locations: {
        'Kak Redead Grotto Chest': () => isAdult() || (inventory.sticks || inventory.swordkokiri || (inventory.magic && inventory.dins))
    },
    exits: {
        'Kakariko Village': () => true
    }
},
{
    regionName: 'Kak Open Grotto',
    scene: 'Kak Open Grotto',
    locations: {
        'Kak Open Grotto Chest': () => true
    },
    exits: {
        'Kak Backyard': () => true
    }
},
{
    regionName: 'DMT Cow Grotto',
    scene: 'DMT Cow Grotto',
    locations: {
        'DMT Cow Grotto Cow': () => inventory.ocarina && inventory.eponas
    },
    exits: {
        'Death Mountain Summit': () => true
    }
},
{
    regionName: 'DMT Storms Grotto',
    scene: 'DMT Storms Grotto',
    locations: {
        'DMT Storms Grotto Chest': () => true
    },
    exits: {
        'Death Mountain': () => true
    }
},
{
    regionName: 'GC Grotto',
    scene: 'GC Grotto',
    locations: {
        'GC Deku Scrub Grotto Left': () => canStunDeku(),
        'GC Deku Scrub Grotto Right': () => canStunDeku(),
        'GC Deku Scrub Grotto Center': () => canStunDeku()
    },
    exits: {
        'GC Grotto Platform': () => true
    }
},
{
    regionName: 'DMC Upper Grotto',
    scene: 'DMC Upper Grotto',
    locations: {
        'DMC Upper Grotto Chest': () => true
    },
    exits: {
        'DMC Upper Local': () => true
    }
},
{
    regionName: 'DMC Hammer Grotto',
    scene: 'DMC Hammer Grotto',
    locations: {
        'DMC Deku Scrub Grotto Left': () => canStunDeku(),
        'DMC Deku Scrub Grotto Right': () => canStunDeku(),
        'DMC Deku Scrub Grotto Center': () => canStunDeku()
    },
    exits: {
        'DMC Lower Local': () => true
    }
},
{
    regionName: 'ZR Open Grotto',
    scene: 'ZR Open Grotto',
    locations: {
        'ZR Open Grotto Chest': () => true
    },
    exits: {
        'Zora River': () => true
    }
},
{
    regionName: 'ZR Storms Grotto',
    scene: 'ZR Storms Grotto',
    locations: {
        'ZR Deku Scrub Grotto Rear': () => canStunDeku(),
        'ZR Deku Scrub Grotto Front': () => canStunDeku()
    },
    exits: {
        'Zora River': () => true
    }
},
{
    regionName: 'LH Grotto',
    scene: 'LH Grotto',
    locations: {
        'LH Deku Scrub Grotto Left': () => canStunDeku(),
        'LH Deku Scrub Grotto Right': () => canStunDeku(),
        'LH Deku Scrub Grotto Center': () => canStunDeku()
    },
    exits: {
        'Lake Hylia': () => true
    }
},
{
    regionName: 'Colossus Grotto',
    scene: 'Colossus Grotto',
    locations: {
        'Colossus Deku Scrub Grotto Rear': () => canStunDeku(),
        'Colossus Deku Scrub Grotto Front': () => canStunDeku()
    },
    exits: {
        'Desert Colossus': () => true
    }
},
{
    regionName: 'GV Octorok Grotto',
    scene: 'GV Octorok Grotto',
    exits: {
        'GV Grotto Ledge': () => true
    }
},
{
    regionName: 'GV Storms Grotto',
    scene: 'GV Storms Grotto',
    locations: {
        'GV Deku Scrub Grotto Rear': () => canStunDeku(),
        'GV Deku Scrub Grotto Front': () => canStunDeku()
    },
    exits: {
        'GV Fortress Side': () => true
    }
},
// Bottom of the Well.json
{
        regionName: 'Bottom of the Well',
        dungeon: 'Bottom of the Well',
        exits: {
            'Kakariko Village': () => true,
            'Bottom of the Well Main Area' : () => canChildAttack() || inventory.nuts
        }
    },
    {
        regionName: 'Bottom of the Well Main Area',
        dungeon: 'Bottom of the Well',
        locations: {
            'Bottom of the Well Front Left Fake Wall Chest': logic_lens_botw || (inventory.lens && inventory.magic),
            'Bottom of the Well Front Center Bombable Chest': () => hasExplosives(),
            'Bottom of the Well Right Bottom Fake Wall Chest': () => logic_lens_botw || (inventory.lens && inventory.magic),
            'Bottom of the Well Compass Chest': () => logic_lens_botw || (inventory.lens && inventory.magic),
            'Bottom of the Well Center Skulltula Chest': () => logic_lens_botw || (inventory.lens && inventory.magic),
            'Bottom of the Well Back Left Bombable Chest': () => hasExplosives() && (logic_lens_botw || (inventory.lens && inventory.magic)),
            'Bottom of the Well Freestanding Key': () => inventory.sticks || (inventory.dins && inventory.magic),
            'Bottom of the Well Lens of Truth Chest': () => (inventory.lullaby && inventory.ocarina) && (inventory.swordkokiri || (inventory.sticks && logic_child_deadhand)),
            'Bottom of the Well Invisible Chest': () => (inventory.lullaby && inventory.ocarina) && (logic_lens_botw || (inventory.lens && inventory.magic)),
            'Bottom of the Well Underwater Front Chest': () => (inventory.lullaby && inventory.ocarina),
            'Bottom of the Well Underwater Left Chest': () => (inventory.lullaby && inventory.ocarina),
            'Bottom of the Well Map Chest': () =>
                hasExplosives() || 
                (((inventory.keyswell > 2 && (logic_lens_botw || (inventory.lens && inventory.magic))) ||
                    (inventory.dins && inventory.magic) || (logic_botw_basement && inventory.sticks)) &&
                inventory.strength),
            'Bottom of the Well Fire Keese Chest': () => inventory.keyswell > 2 && (logic_lens_botw || (inventory.lens && inventory.magic)),
            'Bottom of the Well Like Like Chest': () => inventory.keyswell > 2 && (logic_lens_botw || (inventory.lens && inventory.magic)),
            'Bottom of the Well GS West Inner Room': () => inventory.boomerang && (inventory.keyswell > 2 && (logic_lens_botw || (inventory.lens && inventory.magic))),
            'Bottom of the Well GS East Inner Room': () => inventory.boomerang && (inventory.keyswell > 2 && (logic_lens_botw || (inventory.lens && inventory.magic))),
            'Bottom of the Well GS Like Like Cage': () => inventory.boomerang && (inventory.keyswell > 2 && (logic_lens_botw || (inventory.lens && inventory.magic)))
        },
        exits: {
            'Bottom of the Well' : () => true
        }
    },
// Deku Tree.json
    {
        regionName: 'Deku Tree Lobby',
        dungeon: 'Deku Tree',
        events: {
            'Can Burn Backroom Web': () => hasFireSourceWithTorch(),
            'Can Trigger Deku Eye Switch': () => isChild() && inventory.slingshot,
            'Can Climb Deku Water Ledge': () => logic_deku_b1_skip
        },
        locations: {
            'Deku Tree Map Chest': () => true,
            'Deku Tree Compass Chest': () => true,
            'Deku Tree Compass Room Side Chest': () => true,
            'Deku Tree Basement Chest': () => canChildAttack() || inventory.nuts,
            'Deku Tree GS Compass Room': () => canChildAttack(),
            'Deku Tree GS Basement Vines': () => canUseProjectile() || (inventory.dins && inventory.magic) || (logic_deku_basement_gs && (inventory.sticks || inventory.swordkokiri)),
            'Deku Tree GS Basement Gate': () => canChildAttack()
        },
        exits: {
            'KF Outside Deku Tree': () => true,
            'Deku Tree Slingshot Room': () => inventory.shielddeku,
            'Deku Tree Basement Backroom': () => (eventCompletable('Can Burn Backroom Web') && eventCompletable('Can Trigger Deku Eye Switch')) || (isChild() && eventCompletable('Can Climb Deku Water Ledge')),
            'Deku Tree Boss Room': () => hasFireSourceWithTorch() && (logic_deku_b1_skip || inventory.slingshot)
        }
    },
    {
        regionName: 'Deku Tree Slingshot Room',
        dungeon: 'Deku Tree',
        locations: {
            'Deku Tree Slingshot Chest': () => true,
            'Deku Tree Slingshot Room Side Chest': () => true
        },
        exits: {
            'Deku Tree Lobby': () => true
        }
    },
    {
        regionName: 'Deku Tree Basement Backroom',
        dungeon: 'Deku Tree',
        locations: {
            'Deku Tree GS Basement Back Room': () => inventory.boomerang && hasFireSourceWithTorch() && canBlastOrSmash()
        },
        exits: {
            'Deku Tree Lobby': () => true
        }
    },
    {
        regionName: 'Deku Tree Boss Room',
        dungeon: 'Deku Tree',
        events: {
            'Deku Tree Clear': () => inventory.shielddeku && (inventory.swordkokiri || inventory.sticks)
        },
        locations: {
            'Deku Tree Queen Gohma Heart': () => inventory.shielddeku && (inventory.swordkokiri || inventory.sticks),
            'Queen Gohma': () => inventory.shielddeku && (inventory.swordkokiri || inventory.sticks)
        },
        exits: {
            'Deku Tree Lobby': () => true
        }
    },
// Dodongos Cavern.json
    {
        regionName: 'Dodongos Cavern Beginning',
        dungeon: 'Dodongos Cavern',
        events: {
            'Can Open DC Lobby': () => canBlastOrSmash() || inventory.strength
        },
        exits: {
            'Death Mountain': () => true,
            'Dodongos Cavern Lobby': eventCompletable('Can Open DC Lobby')
        }
    },
    {
        regionName: 'Dodongos Cavern Lobby',
        dungeon: 'Dodongos Cavern',
        locations: {
            'Dodongos Cavern Map Chest': () => true,
            'Dodongos Cavern GS Side Room Near Lower Lizalfos': () => hasExplosives() || isAdult() || inventory.slingshot || inventory.boomerang || inventory.sticks || inventory.swordkokiri,
            'Dodongos Cavern GS Scarecrow': () => canUseScarecrow() || inventory.shot > 1 || (logic_dc_scarecrow_gs && (isAdult() || canChildAttack())),
            'Dodongos Cavern Deku Scrub Side Room Near Dodongos': () => isAdult() || inventory.slingshot || inventory.sticks || hasExplosives() || inventory.swordkokiri,
            'Dodongos Cavern Deku Scrub Lobby': () => true,
        },
        exits: {
            'Dodongos Cavern Beginning': () => true,
            'Dodongos Cavern Staircase Room': () => isAdult() || inventory.sticks || ((inventory.dins && inventory.magic) && (inventory.slingshot || hasExplosives() || inventory.swordkokiri)),
            'Dodongos Cavern Far Bridge': () => eventCompletable('Dodongos Cavern Far Bridge Access')
        }
    },
    {
        regionName: 'Dodongos Cavern Staircase Room',
        dungeon: 'Dodongos Cavern',
        locations: {
            'Dodongos Cavern Compass Chest': () => true,
            'Dodongos Cavern GS Vines Above Stairs': () => hasExplosives() || inventory.strength || (inventory.dins && inventory.magic) || (isAdult() && ((logic_dc_staircase && inventory.bow) || (logic_dc_vines_gs && inventory.shot > 1)))
        },
        exits: {
            'Dodongos Cavern Lobby': () => true,
            'Dodongos Cavern Climb': () => hasExplosives() || inventory.strength || (inventory.dins && inventory.magic) || (isAdult() && logic_dc_staircase && inventory.bow)
        }
    },
    {
        regionName: 'Dodongos Cavern Climb',
        dungeon: 'Dodongos Cavern',
        locations: {
            'Dodongos Cavern Bomb Flower Platform Chest': () => true,
            'Dodongos Cavern Deku Scrub Near Bomb Bag Right': () => canBlastOrSmash() || (logic_dc_scrub_room && isAdult() && inventory.strength),
            'Dodongos Cavern Deku Scrub Near Bomb Bag Left': () => canBlastOrSmash() || (logic_dc_scrub_room && isAdult() && inventory.strength)
        },
        exits: {
            'Dodongos Cavern Lobby': () => true,
            'Dodongos Cavern Far Bridge': () => 
                (isChild() && (inventory.slingshot || (logic_dc_slingshot_skip && (inventory.sticks || hasExplosives() || inventory.swordkokiri)))) ||
                (isAdult() && (inventory.bow || inventory.bootshover || inventory.shot > 1 || logic_dc_jump))
        }
    },
    {
        regionName: 'Dodongos Cavern Far Bridge',
        dungeon: 'Dodongos Cavern',
        events: {
            'Dodongos Cavern Far Bridge Access': () => true
        },
        locations: {
            'Dodongos Cavern Bomb Bag Chest': () => true,
            'Dodongos Cavern End of Bridge Chest': () => canBlastOrSmash(),
            'Dodongos Cavern GS Alcove Above Stairs': () => (isAdult() && inventory.slingshot) || (isChild() && inventory.boomerang)
        },
        exits: {
            'Dodongos Cavern Boss Area': () => hasExplosives(),
            'Dodongos Cavern Lobby': () => true
        }
    },
    {
        regionName: 'Dodongos Cavern Boss Area',
        dungeon: 'Dodongos Cavern',
        locations: {
            'Dodongos Cavern Boss Room Chest': () => true,
            'Dodongos Cavern King Dodongo Heart': () => (inventory.bombs || inventory.strength) && (isAdult() || inventory.sticks || inventory.swordkokiri),
            'King Dodongo': () => (inventory.bombs || inventory.strength) && (isAdult() || inventory.sticks || inventory.swordkokiri),
            'Dodongos Cavern GS Back Room': () => true
        },
        exits: {
            'Dodongos Cavern Lobby': () => true
        }
    },
// Fire Temple.json
    {
        regionName: 'Fire Temple Lower',
        dungeon: 'Fire Temple',
        locations: {
            'Fire Temple Near Boss Chest' : () => logic_fewer_tunic_requirements || inventory.tunicgoron,
            'Fire Temple Flare Dancer Chest': () => (inventory.keysfire > 7 || keysanity === false) && inventory.hammer,
            'Fire Temple Boss Key Chest': () => (inventory.keysfire > 7 || keysanity === false) && inventory.hammer,
            'Fire Temple Volvagia Heart': () => inventory.tunicgoron && inventory.hammer && inventory.bosskeyfire && (logic_fire_boss_door_jump || inventory.bootshover || eventCompletable('Volvagia Access')),
            'Volvagia': () => inventory.tunicgoron && inventory.hammer && inventory.bosskeyfire && (logic_fire_boss_door_jump || inventory.bootshover || eventCompletable('Volvagia Access')),
            'Fire Temple GS Boss Key Loop': () => (inventory.keysfire > 7 || keysanity === false) && inventory.hammer
        },
        exits: {
            'DMC Fire Temple Entrance': () => true,
            'Fire Temple Big Lava Room': () => inventory.keysfire > 1 && (logic_fewer_tunic_requirements || inventory.tunicgoron)
        }
    },
    {
        regionName: 'Fire Temple Big Lava Room',
        dungeon: 'Fire Temple',
        locations: {
            'Fire Temple Big Lava Room Lower Open Door Chest': () => true,
            'Fire Temple Big Lava Room Blocked Door Chest': () => hasExplosives(),
            'Fire Temple GS Song of Time Room': () => ((inventory.time && inventory.ocarina) || logic_fire_song_of_time)
        },
        exits: {
            'Fire Temple Lower':  () => true,
            'Fire Temple Middle': () => inventory.tunicgoron && inventory.keysfire > 3 && (inventory.strength || logic_fire_strength) && (hasExplosives() || inventory.bow || inventory.shot)
        }
    },
    {
        regionName: 'Fire Temple Middle',
        dungeon: 'Fire Temple',
        locations: {
            'Fire Temple Boulder Maze Lower Chest': () => true,
            'Fire Temple Boulder Maze Upper Chest': () => inventory.keysfire > 5,
            'Fire Temple Boulder Maze Side Room Chest': () => true,
            'Fire Temple Boulder Maze Shortcut Chest': hasExplosives() && inventory.keysfire > 5,
            'Fire Temple Scarecrow Chest': () => inventory.keysfire > 5 && (canUseScarecrow() || (logic_fire_scarecrow && inventory.shot > 1)),
            'Fire Temple Map Chest': () => inventory.keysfire > 4 && (inventory.bow || inventory.keysfire > 5),
            'Fire Temple Compass Chest': () => inventory.keysfire > 6,
            'Fire Temple GS Boulder Maze': () => inventory.keysfire > 3 && hasExplosives(),
            'Fire Temple GS Scarecrow Climb': () => inventory.keysfire > 5 && (canUseScarecrow() || (logic_fire_scarecrow && inventory.shot > 1)),
            'Fire Temple GS Scarecrow Top': () => inventory.keysfire > 5 && (canUseScarecrow() || (logic_fire_scarecrow && inventory.shot > 1))
        },
        exits: {
            'Fire Temple Upper': () => inventory.keysfire > 6 && (inventory.keysfire > 7 || (inventory.bootshover && inventory.hammer) || logic_fire_flame_maze)
        }
    },
    {
        regionName: 'Fire Temple Upper',
        dungeon: 'Fire Temple',
        events: {
            'Volvagia Access': () => (inventory.time && inventory.ocarina) || hasExplosives()
        },
        locations: {
            'Fire Temple Highest Goron Chest': () => inventory.hammer && 
                ((inventory.time && inventory.ocarina) || (logic_rusted_switches && 
                    (inventory.bootshover || hasExplosives()))),
            'Fire Temple Megaton Hammer Chest': () => hasExplosives()
        }
    },
// Forest Temple.json
    {
        regionName: 'Forest Temple Lobby',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple First Room Chest': () => true,
            'Forest Temple First Stalfos Chest': () => true,
            'Forest Temple GS First Room': () => inventory.shot || inventory.bow || inventory.bombs || inventory.bombchus || (inventory.dins && inventory.magic) || (logic_forest_first_gs && (canJumpslash() && (damage_multiplier != 'ohko' || inventory.bottle || (inventory.magic && inventory.nayrus)))),
            'Forest Temple GS Lobby': () => inventory.shot
        },
        exits: {
            'SFM Forest Temple Entrance Ledge': () => true,
            'Forest Temple NW Outdoors': () => inventory.time && inventory.ocarina,
            'Forest Temple NE Outdoors': () => inventory.bow,
            'Forest Temple Block Push Room': () => inventory.keysforest > 0,
            'Forest Temple Boss Region': () => eventCompletable('Forest_Temple_Jo_and_Beth') && eventCompletable('Forest_Temple_Amy_and_Meg')
        }
    },
    {
        regionName: 'Forest Temple NW Outdoors',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple GS Level Island Courtyard': () => inventory.shot > 1 && note('This check is also at Forest Temple Outside Upper Ledge')
        },
        exits: {
            'Forest Temple NE Outdoors': () => inventory.scale > 1,
            'Forest Temple Outdoors High Balconies': () => true
        }
    },
    {
        regionName: 'Forest Temple NE Outdoors',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple Raised Island Courtyard Chest': () => inventory.shot > 0 && note('This check is also at Forest Temple Falling Room and Forest Temple Outdoors High Balconies'),
            'Forest Temple GS Raised Island Courtyard': () => inventory.shot > 0 && note('This check is also at Forest Temple Falling Room')
        },
        exits: {
            'Forest Temple Outdoors High Balconies': () => inventory.shot > 1 || (logic_forest_vines && inventory.shot),
            'Forest Temple NW Outdoors': () => inventory.bootsiron || inventory.scale > 1,
            'Forest Temple Lobby': () => true
        }
    },
    {
        regionName: 'Forest Temple Outdoors High Balconies',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple Well Chest': () => true,
            'Forest Temple Map Chest': () => true,
            'Forest Temple Raised Island Courtyard Chest': () => logic_forest_outdoors_ledge && inventory.bootshover && note('This check is also at Forest Temple NE Outdoors and Forest Temple Falling Room')
        },
        exits: {
            'Forest Temple NW Outdoors': () => true,
            'Forest Temple NE Outdoors': () => true,
            'Forest Temple Falling Room': () => logic_forest_door_frame && inventory.bootshover && canUseScarecrow()
        }
    },
    {
        regionName: 'Forest Temple Falling Room',
        dungeon: 'Forest Temple',
        events: {
            'Forest Temple Amy && Meg': () => inventory.bow
        },
        locations: {
            'Forest Temple Falling Ceiling Room Chest': () => true,
            'Forest Temple Raised Island Courtyard Chest': () => true && note('This check is also at Forest Temple NE Outdoors and Forest Temple Outdoors High Balconies'),
            'Forest Temple GS Raised Island Courtyard': () => (inventory.bow || inventory.dins && inventory.magic || hasExplosives()) && note('This check is also at Forest Temple NE Outdoors')
        },
        exits: {
            'Forest Temple NE Outdoors': () => true
        }
    },
    {
        regionName: 'Forest Temple Block Push Room',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple Eye Switch Chest': () => inventory.strength && inventory.bow
        },
        exits: {
            'Forest Temple Outside Upper Ledge': inventory.bootshover || (logic_forest_outside_backdoor && inventory.strength),
            'Forest Temple Bow Region': () => inventory.strength && inventory.keysforest > 2,
            'Forest Temple Straightened Hall': () => inventory.strength && inventory.keysforest > 1 && inventory.bow
        }
    },
    {
        regionName: 'Forest Temple Straightened Hall',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple Boss Key Chest': () => true
        },
        exits: {
            'Forest Temple Outside Upper Ledge': () => true
        }
    },
    {
        regionName: 'Forest Temple Outside Upper Ledge',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple Floormaster Chest': () => true,
            'Forest Temple GS Level Island Courtyard': () => inventory.shot > 0 && note('This check is also at Forest Temple NW Outdoors')
        },
        exits: {
            'Forest Temple NW Outdoors': () => true
        }
    },
    {
        regionName: 'Forest Temple Bow Region',
        dungeon: 'Forest Temple',
        events: {
            'Forest Temple Jo and Beth': () => inventory.bow
        },
        locations: {
            'Forest Temple Bow Chest': () => true,
            'Forest Temple Red Poe Chest': () => inventory.bow,
            'Forest Temple Blue Poe Chest': () => inventory.bow
        },
        exits: {
            'Forest Temple Falling Room': () => inventory.keysforest > 4 && (inventory.bow || (inventory.dins && inventory.magic))
        }
    },
    {
        regionName: 'Forest Temple Boss Region',
        dungeon: 'Forest Temple',
        locations: {
            'Forest Temple Basement Chest': () => true,
            'Forest Temple Phantom Ganon Heart': () => inventory.bosskeyforest,
            'Phantom Ganon': () => inventory.bosskeyforest,
            'Forest Temple GS Basement': () => inventory.shot
        }
    },
// Ganons Castle.json
    {
        regionName: 'Ganons Castle Lobby',
        dungeon: 'Ganons Castle',
        exits: {
            'Castle Grounds': () => true,
            'Ganons Castle Forest Trial': () => true,
            'Ganons Castle Fire Trial': () => true,
            'Ganons Castle Water Trial': () => true,
            'Ganons Castle Shadow Trial': () => true,
            'Ganons Castle Spirit Trial': () => true,
            'Ganons Castle Light Trial': () => inventory.strength > 2,
            'Ganons Castle Tower': () => 
                (skippedTrials.forest || 'Forest Trial Clear') && 
                (skippedTrials.fire || 'Fire Trial Clear') && 
                (skippedTrials.water || 'Water Trial Clear') && 
                (skippedTrials.shadow || 'Shadow Trial Clear') && 
                (skippedTrials.spirit || 'Spirit Trial Clear') && 
                (skippedTrials.light || 'Light Trial Clear'), // COME BACK
            'Ganons Castle Deku Scrubs': () => logic_lens_castle || (inventory.lens && inventory.magic)
        }
    },
    {
        regionName: 'Ganons Castle Deku Scrubs',
        dungeon: 'Ganons Castle',
        locations: {
            'Ganons Castle Deku Scrub Center-Left': () => true,
            'Ganons Castle Deku Scrub Center-Right': () => true,
            'Ganons Castle Deku Scrub Right': () => true,
            'Ganons Castle Deku Scrub Left': () => true
        }
    },
    {
        regionName: 'Ganons Castle Forest Trial',
        dungeon: 'Ganons Castle',
        events: {
            'Forest Trial Clear': () => inventory.arrowslight && inventory.bow && inventory.magic && (inventory.arrowsfire || inventory.dins)
        },
        locations: {
            'Ganons Castle Forest Trial Chest': () => true
        }
    },
    {
        regionName: 'Ganons Castle Fire Trial',
        dungeon: 'Ganons Castle',
        events: {
            'Fire Trial Clear': () => () => inventory.tunicgoron && inventory.strength > 2 && inventory.bow && inventory.magic && inventory.arrowslight && inventory.shot > 1
        }
    },
    {
        regionName: 'Ganons Castle Water Trial',
        dungeon: 'Ganons Castle',
        events: {
            'Can Get Blue Fire GC': () => inventory.bottle,
            'Water Trial Clear': () => inventory.hammer && inventory.bottle && inventory.bow && inventory.magic && inventory.arrowslight // 'Blue_Fire'
        },
        locations: {
            'Ganons Castle Water Trial Left Chest': () => true,
            'Ganons Castle Water Trial Right Chest': () => true
        }
    },
    {
        regionName: 'Ganons Castle Shadow Trial',
        dungeon: 'Ganons Castle',
        events: {
            'Shadow Trial Clear': () =>
                inventory.arrowslight && inventory.bow && inventory.magic && inventory.hammer && 
                ((inventory.arrowsfire && (logic_lens_castle || (inventory.lens && inventory.magic))) ||
                    (inventory.shot > 1 && (inventory.bootshover || (inventory.dins && inventory.magic && (logic_lens_castle && inventory.magic)))))
        },
        locations: {
            'Ganons Castle Shadow Trial Front Chest': () => (inventory.arrowsfire && inventory.bow && inventory.magic) || inventory.shot || inventory.bootshover || (inventory.time && inventory.ocarina),
            'Ganons Castle Shadow Trial Golden Gauntlets Chest': () => (inventory.arrowsfire && inventory.bow && inventory.magic) || (inventory.shot > 1 && (inventory.bootshover || (inventory.dins && inventory.magic)))
        }
    },
    {
        regionName: 'Ganons Castle Spirit Trial',
        dungeon: 'Ganons Castle',
        events: {
            'Spirit Trial Clear': () => inventory.arrowslight && inventory.bow && inventory.magic && inventory.shieldmirror && hasBombchus() && (logic_spirit_trial_hookshot || inventory.shot)
        },
        locations: {
            'Ganons Castle Spirit Trial Crystal Switch Chest': () => (inventory.shot || logic_spirit_trial_hookshot),
            'Ganons Castle Spirit Trial Invisible Chest': () => (inventory.shot || logic_spirit_trial_hookshot) && hasBombchus() && (logic_lens_castle || (inventory.lens && inventory.magic))
        }
    },
    {
        regionName: 'Ganons Castle Light Trial',
        dungeon: 'Ganons Castle',
        events: {
            'Light Trial Clear': () => inventory.arrowslight && inventory.bow && inventory.magic && inventory.shot && inventory.keysganon > 1 && (logic_lens_castle || (inventory.lens && inventory.magic))
        },
        locations: {
            'Ganons Castle Light Trial First Left Chest': () => true,
            'Ganons Castle Light Trial Second Left Chest': () => true,
            'Ganons Castle Light Trial Third Left Chest': () => true,
            'Ganons Castle Light Trial First Right Chest': () => true,
            'Ganons Castle Light Trial Second Right Chest': () => true,
            'Ganons Castle Light Trial Third Right Chest': () => true,
            'Ganons Castle Light Trial Invisible Enemies Chest': () => logic_lens_castle || (inventory.lens && inventory.magic),
            'Ganons Castle Light Trial Lullaby Chest': () => (inventory.lullaby && inventory.ocarina) && inventory.keysganon > 0
        }
    },
// Gerudo Training Grounds.json
    {
        regionName: 'Gerudo Training Grounds Lobby',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Lobby Left Chest': () => inventory.bow,
            'Gerudo Training Grounds Lobby Right Chest': () => inventory.bow,
            'Gerudo Training Grounds Stalfos Chest': () => true,
            'Gerudo Training Grounds Beamos Chest': () => hasExplosives()
        },
        exits: {
            'Gerudo Fortress': () => true,
            'Gerudo Training Grounds Heavy Block Room': () => inventory.shot || logic_gtg_without_hookshot,
            'Gerudo Training Grounds Lava Room': () => hasExplosives(),
            'Gerudo Training Grounds Central Maze': () => true
        }
    },
    {
        regionName: 'Gerudo Training Grounds Central Maze',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Hidden Ceiling Chest': () => inventory.keysgtg > 2 && (logic_lens_gtg || (inventory.lens && inventory.magic)),
            'Gerudo Training Grounds Maze Path First Chest': inventory.keysgtg > 3,
            'Gerudo Training Grounds Maze Path Second Chest': inventory.keysgtg > 5,
            'Gerudo Training Grounds Maze Path Third Chest': inventory.keysgtg > 6,
            'Gerudo Training Grounds Maze Path Final Chest': inventory.keysgtg > 8
        },
        exits: {
            'Gerudo Training Grounds Central Maze Right': inventory.keysgtg > 8
        }
    },
    {
        regionName: 'Gerudo Training Grounds Central Maze Right',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Maze Right Central Chest': () => true,
            'Gerudo Training Grounds Maze Right Side Chest': () => true,
            'Gerudo Training Grounds Freestanding Key': () => true
        },
        exits: {
            'Gerudo Training Grounds Hammer Room': () => inventory.shot,
            'Gerudo Training Grounds Lava Room': () => true
        }
    },
    {
        regionName: 'Gerudo Training Grounds Lava Room',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Underwater Silver Rupee Chest': () => inventory.shot && (inventory.time && inventory.ocarina) && inventory.bootsiron && (logic_fewer_tunic_requirements || inventory.tuniczora)
        },
        exits: {
            'Gerudo Training Grounds Central Maze Right': () => (inventory.time && inventory.ocarina),
            'Gerudo Training Grounds Hammer Room': () => inventory.shot && (inventory.bootshover || inventory.shot > 1)
        }
    },
    {
        regionName: 'Gerudo Training Grounds Hammer Room',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Hammer Room Clear Chest': () => true,
            'Gerudo Training Grounds Hammer Room Switch Chest': inventory.hammer
        },
        exits: {
            'Gerudo Training Grounds Eye Statue Lower': () => inventory.hammer && inventory.bow,
            'Gerudo Training Grounds Lava Room': () => true
        }
    },
    {
        regionName: 'Gerudo Training Grounds Eye Statue Lower',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Eye Statue Chest': () => inventory.bow
        },
        exits: {
            'Gerudo Training Grounds Hammer Room': () => true
        }
    },
    {
        regionName: 'Gerudo Training Grounds Eye Statue Upper',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Near Scarecrow Chest': () => inventory.bow
        },
        exits: {
            'Gerudo Training Grounds Eye Statue Lower': () => true
        }
    },
    {
        regionName: 'Gerudo Training Grounds Heavy Block Room',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Before Heavy Block Chest': () => true
        },
        exits: {
            'Gerudo Training Grounds Eye Statue Upper': () => (logic_lens_gtg || (inventory.lens && inventory.magic)) && (inventory.shot || (logic_gtg_fake_wall && inventory.bootshover)),
            'Gerudo Training Grounds Like Like Room': () => inventory.strength > 1 && (logic_lens_gtg || (inventory.lens && inventory.magic)) && (inventory.shot || (logic_gtg_fake_wall && inventory.bootshover))
        }
    },
    {
        regionName: 'Gerudo Training Grounds Like Like Room',
        dungeon: 'Gerudo Training Grounds',
        locations: {
            'Gerudo Training Grounds Heavy Block First Chest': () => true,
            'Gerudo Training Grounds Heavy Block Second Chest': () => true,
            'Gerudo Training Grounds Heavy Block Third Chest': () => true,
            'Gerudo Training Grounds Heavy Block Fourth Chest': () => true
        }
    },
// Ice Cavern.json
    {
        regionName: 'Ice Cavern Beginning',
        dungeon: 'Ice Cavern',
        exits: {
            'ZF Ice Ledge': () => true,
            'Ice Cavern': () => isAdult() || hasExplosives() || (inventory.dins && inventory.magic)
        }
    },
    {
        regionName: 'Ice Cavern',
        dungeon: 'Ice Cavern',
        events: {
            'Can Get Blue Fire IC': () => isAdult() && inventory.bottle
        },
        locations: {
            'Ice Cavern Map Chest': () => inventory.bottle && isAdult(), // 'Blue_Fire'
            'Ice Cavern Compass Chest': () => inventory.bottle, // 'Blue_Fire'
            'Ice Cavern Iron Boots Chest': () => inventory.bottle, // 'Blue_Fire'
            'Sheik in Ice Cavern': () => inventory.bottle, // 'Blue_Fire'
            'Ice Cavern Freestanding PoH': () => inventory.bottle, // 'Blue_Fire'
            'Ice Cavern GS Spinning Scythe Room': () => inventory.shot,
            'Ice Cavern GS Heart Piece Room': () => inventory.bottle && inventory.shot, // 'Blue_Fire'
            'Ice Cavern GS Push Block Room': () => inventory.bottle && (inventory.shot || (logic_ice_block_gs && inventory.bootshover)) // 'Blue_Fire'
        }
    },
// Jabu Jabus Belly.json
    {
        regionName: 'Jabu Jabus Belly Beginning',
        dungeon: 'Jabu Jabus Belly',
        exits: {
            'Zoras Fountain': () => true,
            'Jabu Jabus Belly Main': () => canUseProjectile()
        }
    },
    {
        regionName: 'Jabu Jabus Belly Main',
        dungeon: 'Jabu Jabus Belly',
        locations: {
            'Jabu Jabus Belly Boomerang Chest': () => true,
            'Jabu Jabus Belly GS Water Switch Room': () => true,
            'Jabu Jabus Belly GS Lobby Basement Lower': () => inventory.boomerang,
            'Jabu Jabus Belly GS Lobby Basement Upper': () => inventory.boomerang,
            'Jabu Jabus Belly Deku Scrub': () => true
        },
        exits: {
            'Jabu Jabus Belly Beginning': () => true,
            'Jabu Jabus Belly Depths': () => inventory.boomerang,
            'Jabu Jabus Belly Boss Area': () => false // Adult-only, currently out-of-scope
        }
    },
    {
        regionName: 'Jabu Jabus Belly Depths',
        dungeon: 'Jabu Jabus Belly',
        locations: {
            'Jabu Jabus Belly Map Chest': () => true,
            'Jabu Jabus Belly Compass Chest': () => true
        },
        exits: {
            'Jabu Jabus Belly Main': () => true,
            'Jabu Jabus Belly Boss Area': () => inventory.sticks || inventory.swordkokiri
        }
    },
    {
        regionName: 'Jabu Jabus Belly Boss Area',
        dungeon: 'Jabu Jabus Belly',
        locations: {
            'Jabu Jabus Belly Barinade Heart': () => inventory.boomerang,
            'Barinade': () => inventory.boomerang,
            'Jabu Jabus Belly GS Near Boss': () => true
        },
        exits: {
            'Jabu Jabus Belly Main': () => true
        }
    },
// Shadow Temple.json
    {
        regionName: 'Shadow Temple Entryway',
        dungeon: 'Shadow Temple',
        exits: {
            'Graveyard Warp Pad Region': () => true,
            'Shadow Temple Beginning': () => (logic_lens_shadow || (inventory.lens && inventory.magic)) && (inventory.bootshover || inventory.shot)
        }
    },
    {
        regionName: 'Shadow Temple Beginning',
        dungeon: 'Shadow Temple',
        locations: {
            'Shadow Temple Map Chest': () => true,
            'Shadow Temple Hover Boots Chest': () => true
        },
        exits: {
            'Shadow Temple Entryway': () => true,
            'Shadow Temple First Beamos': () => inventory.bootshover
        }
    },
    {
        regionName: 'Shadow Temple First Beamos',
        dungeon: 'Shadow Temple',
        locations: {
            'Shadow Temple Compass Chest': () => true,
            'Shadow Temple Early Silver Rupee Chest': () => true
        },
        exits: {
            'Shadow Temple Huge Pit': () => hasExplosives() && inventory.keysshadow > 0
        }
    },
    {
        regionName: 'Shadow Temple Huge Pit',
        dungeon: 'Shadow Temple',
        locations: {
            'Shadow Temple Invisible Blades Visible Chest': () => true,
            'Shadow Temple Invisible Blades Invisible Chest': () => true,
            'Shadow Temple Falling Spikes Lower Chest': () => true,
            'Shadow Temple Falling Spikes Upper Chest': () => inventory.strength || logic_shadow_umbrella,
            'Shadow Temple Falling Spikes Switch Chest': () => inventory.strength || logic_shadow_umbrella,
            'Shadow Temple Invisible Spikes Chest': () => inventory.keysshadow > 1 && (logic_lens_shadow_back || (inventory.lens && inventory.magic)),
            'Shadow Temple Freestanding Key': () => inventory.keysshadow > 1 && (logic_lens_shadow_back || (inventory.lens && inventory.magic)) && inventory.shot && (inventory.bombs || inventory.strength || (logic_shadow_freestanding_keys && hasBombchus())),
            'Shadow Temple GS Like Like Room': () => true,
            'Shadow Temple GS Falling Spikes Room': () => logic_shadow_umbrella_gs || inventory.shot,
            'Shadow Temple GS Single Giant Pot': () => inventory.keysshadow > 1 && (logic_lens_shadow_back || (inventory.lens && inventory.magic)) && inventory.shot
        },
        exits: {
            'Shadow Temple Wind Tunnel': () => (logic_lens_shadow_back || (inventory.lens && inventory.magic)) && inventory.shot && inventory.keysshadow > 2
        }
    },
    {
        regionName: 'Shadow Temple Wind Tunnel',
        dungeon: 'Shadow Temple',
        locations: {
            'Shadow Temple Wind Hint Chest': () => true,
            'Shadow Temple After Wind Enemy Chest': () => true,
            'Shadow Temple After Wind Hidden Chest': () => true,
            'Shadow Temple GS Near Ship': () => inventory.shot > 1 && inventory.keysshadow > 3
        },
        exits: {
            'Shadow Temple Beyond Boat': () => (inventory.lullaby && inventory.ocarina) && inventory.keysshadow > 3
        }
    },
    {
        regionName: 'Shadow Temple Beyond Boat',
        dungeon: 'Shadow Temple',
        locations: {
            'Shadow Temple Spike Walls Left Chest': '(inventory.dins && inventory.magic)',
            'Shadow Temple Boss Key Chest': '(inventory.dins && inventory.magic)',
            'Shadow Temple Invisible Floormaster Chest': () => true,
            'Shadow Temple Bongo Bongo Heart': () => inventory.keysshadow > 4 && inventory.bosskeyshadow && (inventory.bow || canUseScarecrow('distant') || (logic_shadow_statue && hasBombchus())),
            'Bongo Bongo': () => inventory.keysshadow > 4 && inventory.bosskeyshadow && (inventory.bow || canUseScarecrow('distant') || (logic_shadow_statue && hasBombchus())),
            'Shadow Temple GS Triple Giant Pot': () => true
        }
    },
// Spirit Temple.json
    {
        regionName: 'Spirit Temple Lobby',
        dungeon: 'Spirit Temple',
        exits: {
            'Desert Colossus From Spirit Lobby': () => true,
            'Child Spirit Temple': () => isChild(),
            'Early Adult Spirit Temple': () => isAdult() && inventory.strength > 1
        }
    },
    {
        regionName: 'Child Spirit Temple',
        dungeon: 'Spirit Temple',
        locations: {
            'Spirit Temple Child Bridge Chest': () => 
                (inventory.boomerang || inventory.slingshot || (hasBombchus() && logic_spirit_child_bombchu)) &&
                (inventory.sticks || hasExplosives() ||
                    ((inventory.nuts || inventory.boomerang) &&
                        (inventory.swordkokiri || inventory.slingshot))),
            'Spirit Temple Child Early Torches Chest': () => 
            (inventory.boomerang || inventory.slingshot || (hasBombchus() && logic_spirit_child_bombchu)) &&
            (inventory.sticks || hasExplosives() ||
                ((inventory.nuts || inventory.boomerang) &&
                    (inventory.swordkokiri || inventory.slingshot))) && 
                (inventory.sticks || (inventory.dins && inventory.magic)),
            'Spirit Temple GS Metal Fence': () => 
            (inventory.boomerang || inventory.slingshot || (hasBombchus() && logic_spirit_child_bombchu)) &&
            (inventory.sticks || hasExplosives() ||
                ((inventory.nuts || inventory.boomerang) &&
                    (inventory.swordkokiri || inventory.slingshot)))
        },
        exits: {
            'Child Spirit Before Locked Door': () => true
        }
    },
    {
        regionName: 'Child Spirit Before Locked Door',
        dungeon: 'Spirit Temple',
        exits: {
            'Child Spirit Temple Climb': '(Small_Key_Spirit_Temple, 1)'
        }
    },
    {
        regionName: 'Child Spirit Temple Climb',
        dungeon: 'Spirit Temple',
        locations: {
            'Spirit Temple Child Climb North Chest': () =>
                hasProjectile('both') ||
                ((inventory.keysspirit > 2 ||
                    (inventory.keysspirit > 1 && bombchus_in_logic && entrance_shuffle === false)) &&
                    (isAdult() && inventory.strength > 1) && hasProjectile('adult')) ||
                (inventory.keysspirit > 4 && isChild() && hasProjectile('child')),
            'Spirit Temple Child Climb East Chest': () =>
                hasProjectile('both') ||
                ((inventory.keysspirit > 2 ||
                    (inventory.keysspirit > 1 && bombchus_in_logic && entrance_shuffle === false)) &&
                    (isAdult() && inventory.strength > 1) && hasProjectile('adult')) ||
                (inventory.keysspirit > 4 && isChild() && hasProjectile('child')),
            'Spirit Temple GS Sun on Floor Room': () =>
                hasProjectile('both') ||
                (inventory.dins && inventory.magic) ||
                ((damage_multiplier != 'ohko' || inventory.bottle || (inventory.nayrus && inventory.magic)) &&
                    (inventory.sticks || inventory.swordkokiri || hasProjectile('child'))) ||
                (isChild() &&
                    inventory.keysspirit > 4 && hasProjectile('child')) ||
                ((inventory.keysspirit > 2 ||
                    (inventory.keysspirit > 1 && bombchus_in_logic && entrance_shuffle === false)) &&
                    (isAdult() && inventory.strength > 1) &&
                    (hasProjectile('adult') || damage_multiplier != 'ohko' || inventory.bottle || (inventory.nayrus && inventory.magic))) // yikes
        },
        exits: {
            'Spirit Temple Central Chamber': () => hasExplosives(),
            'Child Spirit Before Locked Door': () => inventory.keysspirit > 4
        }
    },
    {
        regionName: 'Early Adult Spirit Temple',
        dungeon: 'Spirit Temple',
        locations: {
            'Spirit Temple Compass Chest': () => isAdult() && inventory.shot && (inventory.lullaby && inventory.ocarina),
            'Spirit Temple Early Adult Right Chest': () => inventory.bow || inventory.shot || hasBombchus() || (inventory.bombs && logic_spirit_lower_adult_switch),
                // requires a very specific Bombchu use, Hover Boots can be skipped by jumping on top of the rolling rock.
            'Spirit Temple First Mirror Left Chest': () => inventory.keysspirit > 2,
            'Spirit Temple First Mirror Right Chest': () => inventory.keysspirit > 2,
            'Spirit Temple GS Boulder Room': () => (inventory.time && inventory.ocarina) && (inventory.bow || inventory.shot || inventory.bombchus || (inventory.bombs && logic_spirit_lower_adult_switch))
        },
        exits: {
            'Spirit Temple Central Chamber': () => inventory.keysspirit > 0,
        }
    },
    {
        regionName: 'Spirit Temple Central Chamber',
        dungeon: 'Spirit Temple',
        locations: {
            /*
            'Spirit Temple Map Chest': () =>
                ((hasExplosives() || inventory.keysspirit > 2 || (inventory.keysspirit > 1 && bombchus_in_logic && !entrance_shuffle)) &&
                    ((inventory.dins && inventory.magic) ||
                        (((inventory.magic && inventory.arrowsfire) || logic_spirit_map_chest) && inventory.bow && inventory.sticks))) ||
                (inventory.keysspirit > 4 && hasExplosives() &&
                    (isChild() && inventory.sticks)) ||
                (inventory > 2 &&
                    ((isAdult() && inventory.bow && inventory.magic && inventory.arrowsfire) || (logic_spirit_map_chest && inventory.bow)) &&
                    (isAdult && inventory.strength > 1)),
            'Spirit Temple Sun Block Room Chest': () =>
                ((hasExplosives() || inventory.keysspirit > 2 || (inventory.keysspirit > 1 && bombchus_in_logic && !entrance_shuffle) &&
                    ((inventory.dins && inventory.magic) ||
                        (((inventory.magic && inventory.arrows_fire) || logic_spirit_sun_chest) && inventory.bow && inventory.sticks))) ||
                (inventory.keysspirit > 4 && hasExplosives() &&
                    (isChild() && inventory.sticks)) ||
                (inventory.keysspirit > 2 && 
                    ((isAdult() && inventory.bow && inventory.magic && inventory.arrowsfire) || (logic_spirit_sun_chest && inventory.bow)) &&
                    (isAdult() && inventory.strength > 1)), */
            'Spirit Temple Statue Room Hand Chest': () =>
                inventory.keysspirit > 2 && (isAdult() && inventory.strength > 1) &&
                (inventory.lullaby && inventory.ocarina),
            'Spirit Temple Statue Room Northeast Chest': () =>
                inventory.keysspirit > 2 && (isAdult() && inventory.strength > 1) && (inventory.lullaby && inventory.ocarina) &&
                (inventory.shot || inventory.bootshover || logic_spirit_lobby_jump),
            'Spirit Temple GS Hall After Sun Block Room': () =>
                (hasExplosives() && inventory.boomerang && inventory.shot) ||
                ((isChild() && inventory.boomerang) && inventory.keysspirit > 4 && hasExplosives()) ||
                (inventory.shot && (isAdult() && inventory.strength > 1) &&
                    (inventory.keysspirit > 3 ||
                        (inventory.keysspirit > 1 && inventory.boomerang && bombchus_in_logic && !entrance_shuffle))),
            'Spirit Temple GS Lobby': () =>
                ((hasExplosives() || inventory.keysspirit > 2 || (inventory.keysspirit > 1 && bombchus_in_logic && !entrance_shuffle)) &&
                    logic_spirit_lobby_gs && inventory.boomerang && (inventory.shot || inventory.bootshover || logic_spirit_lobby_jump)) ||
                (logic_spirit_lobby_gs && inventory.keysspirit > 4 && hasExplosives() && (isAdult() && inventory.boomerang)) ||
                (inventory.keysspirit > 2 && (isAdult() && inventory.strength > 1) && (inventory.shot || inventory.bootshover ||logic_spirit_lobby_jump))
        },
        exits: {
            'Spirit Temple Outdoor Hands': () => true,
            'Spirit Temple Beyond Central Locked Door': () => inventory.keysspirit > 3 && isAdult() && inventory.strength > 1,
            'Child Spirit Temple Climb': () => true
        }
    },
    {
        regionName: 'Spirit Temple Outdoor Hands',
        dungeon: 'Spirit Temple',
        locations: {
            'Spirit Temple Silver Gauntlets Chest': () =>
                (inventory.keysspirit > 2 && inventory.shot > 1 && hasExplosives()) ||
                inventory.keysspirit > 4,
            'Spirit Temple Mirror Shield Chest': () =>
                inventory.keysspirit > 3 && (isAdult() && inventory.strength > 1) && hasExplosives(),
        },
        exits: {
            'Desert Colossus': () =>
                (isChild() && inventory.keysspirit > 4) ||
                ((isAdult() && inventory.strength > 1) &&
                    ((inventory.keysspirit > 2 && hasExplosives()) || inventory.keysspirit > 4))
        }
    },
    {
        regionName: 'Spirit Temple Beyond Central Locked Door',
        dungeon: 'Spirit Temple',
        locations: {
            'Spirit Temple Near Four Armos Chest': () => inventory.shieldmirror && hasExplosives(),
            'Spirit Temple Hallway Left Invisible Chest': () => (logic_lens_spirit || (inventory.lens && inventory.magic)) && hasExplosives(),
            'Spirit Temple Hallway Right Invisible Chest': () => (logic_lens_spirit || (inventory.lens && inventory.magic)) && hasExplosives()
        },
        exits: {
            'Spirit Temple Beyond Final Locked Door': () =>
                inventory.keysspirit > 4 &&
                (logic_spirit_wall || inventory.shot > 1 || hasBombchus() ||
                    ((inventory.bombs || inventory.nuts || (inventory.dins && inventory.magic)) &&
                        (inventory.bow || (isAdult() && inventory.shot) || inventory.hammer)))
        }
    },
    {
        regionName: 'Spirit Temple Beyond Final Locked Door',
        dungeon: 'Spirit Temple',
        locations: {
            'Spirit Temple Boss Key Chest': () => inventory.lullaby && inventory.ocarina && inventory.bow && inventory.shot,
            'Spirit Temple Topmost Chest': () => inventory.shieldmirror,
            'Spirit Temple Twinrova Heart': () => inventory.shieldmirror && hasExplosives() && inventory.shot && inventory.bosskeyspirit,
            'Twinrova': () => inventory.shieldmirror && hasExplosives() && inventory.shot && inventory.bosskeyspirit
        }
    },
// Water Temple.json
    {
        regionName: 'Water Temple Lobby',
        dungeon: 'Water Temple',
        events: {
            'Raise Water Level': () => inventory.shot || inventory.bootshover || inventory.bow // More logic if child is allowed. See also 'Child Water Temple'
                // Ensure that the water level can be raised if it were to be lowered.
        },
        exits: {
            'Lake Hylia': () => true,
            'Water Temple Highest Water Level': () => eventCompletable('Raise Water Level'),
            'Water Temple Dive': () =>
                (inventory.tuniczora || logic_fewer_tunic_requirements) && 
                ((logic_water_temple_torch_longshot && inventory.shot > 1) || inventory.bootsiron)
        }
    },
    {
        regionName: 'Water Temple Highest Water Level',
        dungeon:  'Water Temple',
        events: {
            'Water Temple Clear': () => inventory.bosskeywater && inventory.shot > 1
        },
        locations: {
            'Morpha': () => inventory.bosskeywater && inventory.shot > 1,
            'Water Temple Morpha Heart': () => inventory.bosskeywater && inventory.shot > 1
        },
        exits: {
            'Water Temple Falling Platform Room': () => inventory.keyswater > 4
        }
    },
    {
        regionName: 'Water Temple Dive',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple Map Chest': eventCompletable('Raise Water Level'),
            'Water Temple Compass Chest': () => ((inventory.lullaby && inventory.ocarina) || inventory.bootsiron) && inventory.shot,
            'Water Temple Torches Chest': () => (inventory.bow || (inventory.dins && inventory.magic)) && (inventory.lullaby && inventory.ocarina)
            'Water Temple Central Bow Target Chest': () => inventory.strength && (inventory.lullaby && inventory.ocarina) && (inventory.bow && (logic_water_central_bow || inventory.bootshover || inventory.shot > 1)),
            'Water Temple GS Behind Gate': () => (inventory.shot || inventory.bootshover) && hasExplosives() && (inventory.lullaby && inventory.ocarina) && (inventory.bootsiron || inventory.scale),
            'Water Temple GS Central Pillar': '\
                (inventory.lullaby && inventory.ocarina) and\
                    (((can_use(Longshot) || (logic_water_central_gs_fw && can_use(Hookshot) && can_use(Farores_Wind))) && \
                        ((Small_Key_Water_Temple, 6) || can_use(Bow) || (inventory.dins && inventory.magic))) or\
                    (logic_water_central_gs_irons && can_use(Hookshot) && can_use(Iron_Boots) and\
                        (can_use(Bow) || (inventory.dins && inventory.magic))) or\
                    (logic_water_central_gs_fw && Child_Water_Temple && Boomerang && can_use(Farores_Wind) and\
                        (Sticks || (inventory.dins && inventory.magic) or\
                        ((Small_Key_Water_Temple, 6) && (can_use(Hover_Boots) || can_use(Bow))))))'
        },
        exits: {
            'Water Temple Cracked Wall': () => (inventory.lullaby && inventory.ocarina) && (inventory.shot || inventory.bootshover) && (logic_water_cracked_wall_nothing || (logic_water_cracked_wall_hovers && inventory.bootshover)),
            'Water Temple Middle Water Level': () =>
                (inventory.bow || (inventory.dins && inventory.magic) ||
                    (inventory.keyswater > 5 && (isAdult() && inventory.shot))) &&
                (inventory.lullaby && inventory.ocarina),
            'Water Temple North Basement': () =>
                inventory.keyswater > 4 &&
                (isAdult() && inventory.shot > 1 || (logic_water_boss_key_region && inventory.bootshover)) &&
                (isAdult() && inventory.bootsiron) || (inventory.lullaby && inventory.ocarina)
            'Water Temple Dragon Statue': () => (inventory.lullaby && inventory.ocarina) && inventory.strength && ((inventory.bootsiron && inventory.shot) || (logic_water_dragon_adult && inventory.bombchus || inventory.bow || inventory.shot) && (inventory.scale || inventory.bootsiron)) // COME BACK - all bombchu checks probably care about a logic variable
        }
    },
    {
        regionName: 'Water Temple North Basement',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple Boss Key Chest': () => inventory.keyswater > 5 && (logic_water_bk_jump_dive || inventory.bootsiron)) && (logic_water_north_basement_ledge_jump || (hasExplosives() && inventory.strength) || inventory.bootshover),
            'Water Temple GS Near Boss Key Chest': () => true
        }
    },
    {
        regionName: 'Water Temple Cracked Wall',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple Cracked Wall Chest': () => hasExplosives()
        }
    },
    {
        regionName: 'Water Temple Dragon Statue',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple Dragon Chest': () => true
        }
    },
    {
        regionName: 'Water Temple Middle Water Level',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple Central Pillar Chest': () => inventory.bootsiron && inventory.tuniczora && inventory.shot && ((inventory.keyswater > 5 || inventory.bow || (inventory.dins && inventory.magic))
        },
        exits: {
            'Water Temple Cracked Wall': () => true
        }
    },
    {
        regionName: 'Water Temple Falling Platform Room',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple GS Falling Platform Room': () => inventory.shot > 1 || (logic_water_falling_platform_gs_hookshot && inventory.shot)
        },
        exits: {
            'Water Temple Dark Link Region': () => inventory.keyswater > 5 && inventory.shot
        }
    },
    {
        regionName: 'Water Temple Dark Link Region',
        dungeon: 'Water Temple',
        locations: {
            'Water Temple Longshot Chest': () => true,
            'Water Temple River Chest': () => (inventory.time & inventory.ocarina) && inventory.bow,
            'Water Temple GS River': () => (inventory.time && inventory.ocarina) && ((inventory.bootsiron && (inventory.tuniczora || logic_fewer_tunic_requirements) || (logic_water_river_gs && (inventory.shot > 1 && (inventory.bow || inventory.bombchus))))
        },
        exits: {
            'Water Temple Dragon Statue': () => (inventory.tuniczora || logic_fewer_tunic_requirements) && (inventory.time && inventory.ocarina) && inventory.bow && (inventory.bootsiron || logic_water_dragon_jump_dive || logic_water_dragon_adult)
        }
    }
];

export {};
