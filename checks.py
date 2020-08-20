def child_can_attack(): # to do: bombs too?
    return check_requirements([
        {'swordkokiri':1},
        {'stick':1}
        ])

def has_explosives(): # to do: indicate somehow that bombchus are out of logic (different color fo check?)
    return check_requirements([
        {'bombs':1},
        {'bombchus':1}
        ])

def has_explosives_or_hammer():
    return check_requirements([
        {'bombs':1},
        {'bombchus':1},
        {'hammer':1}
        ])

def botw_access():
    return check_requirements({is_child:{'storms':1}})

def river_access():
    return check_requirements([
        {is_adult:True},
        {is_child:[{'scale':1}, {has_explosives:True}]}
        ])

def domain_access(): # to do: Add tricks for cuccoo and hover boots
    return check_requirements([
        {river_access:{'ocarina':1, 'lullaby':1}},
        {is_child:{'scale':1}}
        ])

def jabu_access():
    return check_requirements({domain_access:{'letter':1}})

def fortress_access():
    return check_requirements([
        {'shot':2},
        {'epona':1}
        ])

def desert_colossus_child_access():
    return check_requirements({'ocarina':1, 'requiem':1})

def desert_colossus_access():
    return check_requirements([
        {'ocarina':1, 'requiem':1},
        {is_adult:{fortress_access:[{'magic':1, 'lens':1, 'shot':2}, {'magic':1, 'lens':1, 'bootshover':1}]}}
        ])

def spirit_access():
    # https://www.zeldaspeedruns.com/oot/dungeon-tricks/spirit-temple-child
    return check_requirements([
        {is_child:{desert_colossus_child_access:True}},
        {is_adult:{desert_colossus_access:{'strength':2}}}
        ])

checks = {}

class Check():

    def __init__(self, check_name, location, requirements, child_or_adult):
        self.check_name = check_name
        self.location = location
        self.requirements = requirements
        self.child_or_adult = child_or_adult
        if location not in checks:
            checks[location] = []
        checks[location].append(self)

    def __repr__(self):
        return self.name

Check('10 Big Poes', 'Castle Town', {'epona':1, 'bow':1, 'bottle':1}, 'adult')
Check('10 Gold Skulltula Reward', 'Kakariko', {'skulls':10}, 'both')
Check('20 Gold Skulltula Reward', 'Kakariko', {'skulls':20}, 'both')
Check('30 Gold Skulltula Reward', 'Kakariko', {'skulls':30}, 'both')
Check('40 Gold Skulltula Reward', 'Kakariko', {'skulls':40}, 'both')
Check('50 Gold Skulltula Reward', 'Kakariko', {'skulls':50}, 'both')
Check('Adult Fishing', 'Lake Hylia', {'ocarina':1, 'shot':1}, 'adult')
Check('Adult Shooting Gallery', 'Kakariko', {'bow':1}, 'adult')
Check('Anju as Adult', 'Kakariko', True, 'adult')
Check('Anjus Chickens', 'Kakariko', True, 'child')
Check('Barinade Heart', 'Jabu', {child_can_attack:{'boomerang':1}}, 'child')
Check('Biggoron', 'Death Mountain Trail', {'adult':11}, 'adult')
Check('Bombchu Bowling Bomb Bag', 'Castle Town', {'bombs':1}, 'child')          # To do: need bombs, not bombchus
Check('Bombchu Bowling Piece of Heart', 'Castle Town', {'bombs':1}, 'child')
##Check('Bongo Bongo Heart', 'Shadow Temple', [], 'adult')                      # To do: requirements
Check('Boomerang Chest', 'Jabu', True, 'child')
Check('Bottom of the Well Back Left Bombable', 'BotW', {'bombs':1}, 'child')
Check('Bottom of the Well Basement Chest', 'BotW', True, 'child')
##Check('Bottom of the Well Behind Right Grate', 'BotW', True, 'child')         # To do: small keys
Check('Bottom of the Well Center Large Chest', 'BotW', True, 'child')
Check('Bottom of the Well Center Small Chest', 'BotW', True, 'child')
Check('Bottom of the Well Defeat Boss', 'BotW', {child_can_attack:{'ocarina':1, 'lullaby':1}}, 'child')
Check('Bottom of the Well Freestanding Key', 'BotW', True, 'child')
Check('Bottom of the Well Front Center Bombable', 'BotW', {has_explosives:True}, 'child')
Check('Bottom of the Well Front Left Hidden Wall', 'BotW', True, 'child')
##Check('Bottom of the Well Invisible Chest', 'BotW', {'ocarina':1, 'lullaby':1}, 'child')   # To do: can you get this without killing the boss?
##Check('Bottom of the Well Locked Pits', 'BotW', True, 'child')                # To do: small keys
Check('Bottom of the Well Right Bottom Hidden Wall', 'BotW', True, 'child')
Check('Bottom of the Well Underwater Front Chest', 'BotW', {'ocarina':1, 'lullaby':1}, 'child')
Check('Bottom of the Well Underwater Left Chest', 'BotW', {'ocarina':1, 'lullaby':1}, 'child')
##Check('Chest Above King Dodongo', 'Dodongo', True, 'both')                    # To do: requirements               
Check('Child Fishing', 'Lake Hylia', True, 'child')
Check('Child Shooting Gallery', 'Castle Town', True, 'child')
Check('Colossus Freestanding PoH', 'Desert Colossus', {desert_colossus_child_access:{'beans':1}}, 'adult')
##Check('Composer Grave Chest', 'Graveyard', {'ocarina':1, 'lullaby':1},        # To do: requirements
Check('Crater Fairy Reward', 'Death Mountain Crater', {'hammer':1, 'ocarina':1, 'lullaby':1}, 'adult')
Check('DM Crater Volcano Freestanding PoH', 'Death Mountain Crater', {'ocarina':1, 'bolero':1, 'beans':1}, 'adult')
##Check('DM Crater Wall Freestanding PoH', 'Death Mountain Crater', [], 'both') # To do: requirements
Check('DM Trail Freestanding PoH', 'Death Mountain Trail', True, 'both')
Check('Dampe Race Freestanding PoH', 'Graveyard', True, 'adult')
Check('Darunias Joy', 'Goron City', {'ocarina':1, 'lullaby':1, 'saria':1}, 'child')
Check('Death Mountain Bombable Chest', 'Death Mountain Trail', [{has_explosives:True}, {'hammer':1}], 'both')
Check('Deku Theater Mask of Truth', 'Lost Woods', {'child':7}, 'child')         # To do: requirements for mask rather than mask itself?
Check('Deku Theater Skull Mask', 'Lost Woods', {'child':5}, 'child')            # To do: requirements for mask rather than mask itself?
Check('Deku Tree Basement Chest', 'Deku Tree', True, 'child')
Check('Deku Tree Compass Chest', 'Deku Tree', True, 'child')
Check('Deku Tree Compass Room Side Chest', 'Deku Tree', True, 'child')
Check('Deku Tree Lobby Chest', 'Deku Tree', True, 'child')
Check('Deku Tree Slingshot Chest', 'Deku Tree', True, 'child')
Check('Deku Tree Slingshot Room Side Chest', 'Deku Tree', True, 'child')
Check('Desert Colossus Fairy Reward', 'Desert Colossus', {desert_colossus_access:{has_explosives_or_hammer:{'ocarina':1, 'lullaby':1}}}, 'both')
Check('Diving Minigame', "Zora's Domain", True, 'child')
Check('Diving in the Lab', 'Lake Hylia', {'scale':2}, 'both')
#'Dodongos Cavern Bomb Bag Chest', 'Dodongos Cavern Bomb Flower Platform', 'Dodongos Cavern Compass Chest', 'Dodongos Cavern End of Bridge Chest', 'Dodongos Cavern Map Chest', 'Dog Lady', 'Field Near Lake Outside Fence Grotto Chest', 'Field West Castle Town Grotto Chest', 'Fire Temple Big Lava Room Bombable Chest', 'Fire Temple Big Lava Room Open Chest', 'Fire Temple Boss Key Chest', 'Fire Temple Boulder Maze Bombable Pit', 'Fire Temple Boulder Maze Lower Chest', 'Fire Temple Boulder Maze Side Room', 'Fire Temple Boulder Maze Upper Chest', 'Fire Temple Chest Near Boss', 'Fire Temple Compass Chest', 'Fire Temple Fire Dancer Chest', 'Fire Temple Highest Goron Chest', 'Fire Temple Map Chest', 'Fire Temple Megaton Hammer Chest', 'Fire Temple Scarecrow Chest', 'Forest Temple Block Push Chest', 'Forest Temple Blue Poe Chest', 'Forest Temple Boss Key Chest', 'Forest Temple Bow Chest', 'Forest Temple Chest Behind Lobby', 'Forest Temple Falling Room Chest', 'Forest Temple First Chest', 'Forest Temple Floormaster Chest', 'Forest Temple Map Chest', 'Forest Temple Near Boss Chest', 'Forest Temple Outside Hookshot Chest', 'Forest Temple Red Poe Chest', 'Forest Temple Well Chest', 'Frog Ocarina Game', 'Frogs in the Rain', 'GS Castle Market Guard House', 'GS Death Mountain Crater Crate', 'GS Deku Tree Basement Back Room', 'GS Deku Tree Basement Gate', 'GS Deku Tree Basement Vines', 'GS Deku Tree Compass Room', 'GS Desert Colossus Bean Patch', 'GS Desert Colossus Hill', 'GS Desert Colossus Tree', "GS Dodongo's Cavern Alcove Above Stairs", "GS Dodongo's Cavern Back Room", "GS Dodongo's Cavern East Side Room", "GS Dodongo's Cavern Scarecrow", "GS Dodongo's Cavern Vines Above Stairs", 'GS Fire Temple Basement', 'GS Fire Temple East Tower Climb', 'GS Fire Temple East Tower Top', 'GS Fire Temple Song of Time Room', 'GS Fire Temple Unmarked Bomb Wall', 'GS Forest Temple Basement', 'GS Forest Temple First Room', 'GS Forest Temple Lobby', 'GS Forest Temple Outdoor East', 'GS Forest Temple Outdoor West', 'GS Gerudo Fortress Archery Range', 'GS Gerudo Fortress Top Floor', 'GS Gerudo Valley Bean Patch', 'GS Gerudo Valley Behind Tent', 'GS Gerudo Valley Pillar', 'GS Gerudo Valley Small Bridge', 'GS Goron City Boulder Maze', 'GS Goron City Center Platform', 'GS Graveyard Bean Patch', 'GS Graveyard Wall', 'GS Hyrule Castle Grotto', 'GS Hyrule Castle Tree', 'GS Hyrule Field Near Gerudo Valley', 'GS Hyrule Field near Kakariko', 'GS Ice Cavern Heart Piece Room', 'GS Ice Cavern Push Block Room', 'GS Ice Cavern Spinning Scythe Room', 'GS Jabu Jabu Lobby Basement Lower', 'GS Jabu Jabu Lobby Basement Upper', 'GS Jabu Jabu Near Boss', 'GS Jabu Jabu Water Switch Room', "GS Kakariko Above Impa's House", "GS Kakariko Guard's House", 'GS Kakariko House Under Construction', 'GS Kakariko Skulltula House', 'GS Kakariko Tree', 'GS Kakariko Watchtower', 'GS Kokiri Bean Patch', 'GS Kokiri House of Twins', 'GS Kokiri Know It All House', 'GS Lab Underwater Crate', 'GS Lake Hylia Bean Patch', 'GS Lake Hylia Giant Tree', 'GS Lake Hylia Lab Wall', 'GS Lake Hylia Small Island', 'GS Lon Lon Ranch Back Wall', 'GS Lon Lon Ranch House Window', 'GS Lon Lon Ranch Rain Shed', 'GS Lon Lon Ranch Tree', 'GS Lost Woods Above Stage', 'GS Lost Woods Bean Patch Near Bridge', 'GS Lost Woods Bean Patch Near Stage', 'GS Mountain Crater Bean Patch', "GS Mountain Trail Above Dodongo's Cavern", 'GS Mountain Trail Bean Patch', 'GS Mountain Trail Bomb Alcove', 'GS Mountain Trail Path to Crater', "GS Outside Ganon's Castle", 'GS Sacred Forest Meadow', 'GS Shadow Temple Crusher Room', 'GS Shadow Temple Like Like Room', 'GS Shadow Temple Near Ship', 'GS Shadow Temple Single Giant Pot', 'GS Shadow Temple Triple Giant Pot', 'GS Spirit Temple Bomb for Light Room', 'GS Spirit Temple Boulder Room', 'GS Spirit Temple Hall to West Iron Knuckle', 'GS Spirit Temple Lobby', 'GS Spirit Temple Metal Fence', 'GS Wasteland Ruins', 'GS Water Temple Central Room', 'GS Water Temple Falling Platform Room', 'GS Water Temple Near Boss Key Chest', 'GS Water Temple Serpent River', 'GS Water Temple South Basement', 'GS Well East Inner Room', 'GS Well Like Like Cage', 'GS Well West Inner Room', 'GS Zora River Above Bridge', 'GS Zora River Ladder', 'GS Zora River Near Raised Grottos', 'GS Zora River Tree', "GS Zora's Domain Frozen Waterfall", "GS Zora's Fountain Above the Log", "GS Zora's Fountain Hidden Cave", "GS Zora's Fountain Tree", 'Ganons Castle Fairy Reward', 'Ganons Castle Forest Trial Chest', 'Ganons Castle Light Trial First Left Chest', 'Ganons Castle Light Trial First Right Chest', 'Ganons Castle Light Trial Invisible Enemies Chest', 'Ganons Castle Light Trial Lullaby Chest', 'Ganons Castle Light Trial Second Left Chest', 'Ganons Castle Light Trial Second Right Chest', 'Ganons Castle Light Trial Third Left Chest', 'Ganons Castle Light Trial Third Right Chest', 'Ganons Castle Shadow Trial First Chest', 'Ganons Castle Shadow Trial Second Chest', 'Ganons Castle Spirit Trial First Chest', 'Ganons Castle Spirit Trial Second Chest', 'Ganons Castle Water Trial Left Chest', 'Ganons Castle Water Trial Right Chest', 'Ganons Tower Boss Key Chest', 'Gerudo Fortress Rooftop Chest', 'Gerudo Training Grounds Beamos Chest', 'Gerudo Training Grounds Before Heavy Block Chest', 'Gerudo Training Grounds Eye Statue Chest', 'Gerudo Training Grounds Freestanding Key', 'Gerudo Training Grounds Hammer Room Clear Chest', 'Gerudo Training Grounds Hammer Room Switch Chest', 'Gerudo Training Grounds Heavy Block First Chest', 'Gerudo Training Grounds Heavy Block Fourth Chest', 'Gerudo Training Grounds Heavy Block Second Chest', 'Gerudo Training Grounds Heavy Block Third Chest', 'Gerudo Training Grounds Hidden Ceiling Chest', 'Gerudo Training Grounds Lobby Left Chest', 'Gerudo Training Grounds Lobby Right Chest', 'Gerudo Training Grounds Maze Path Final Chest', 'Gerudo Training Grounds Maze Path First Chest', 'Gerudo Training Grounds Maze Path Second Chest', 'Gerudo Training Grounds Maze Path Third Chest', 'Gerudo Training Grounds Maze Right Central Chest', 'Gerudo Training Grounds Maze Right Side Chest', 'Gerudo Training Grounds Near Scarecrow Chest', 'Gerudo Training Grounds Stalfos Chest', 'Gerudo Training Grounds Underwater Silver Rupee Chest', 'Gerudo Valley Crate Freestanding PoH', 'Gerudo Valley Hammer Rocks Chest', 'Gerudo Valley Waterfall Freestanding PoH', 'Goron City Left Maze Chest', 'Goron City Leftmost Maze Chest', 'Goron City Pot Freestanding PoH', 'Goron City Right Maze Chest', 'Gravedigging Tour', 'Graveyard Freestanding PoH', 'HF Grotto Deku Scrub Piece of Heart', 'Haunted Wasteland Structure Chest', 'Heart Piece Grave Chest', 'Hookshot Chest', 'Horseback Archery 1000 Points', 'Horseback Archery 1500 Points', 'Hyrule Castle Fairy Reward', 'Ice Cavern Compass Chest', 'Ice Cavern Freestanding PoH', 'Ice Cavern Iron Boots Chest', 'Ice Cavern Map Chest', 'Impa House Freestanding PoH', 'Impa at Castle', 'Jabu Jabus Belly Compass Chest', 'Jabu Jabus Belly Map Chest', 'Kakariko Back Grotto Chest', 'King Dodongo', 'King Dodongo Heart', 'King Zora Thawed', 'Kokiri Forest Storms Grotto Chest', 'Kokiri Sword Chest', 'LW Deku Scrub Deku Stick Upgrade', 'LW Grotto Deku Scrub Deku Nut Upgrade', 'Lake Hylia Freestanding PoH', 'Lake Hylia Sun', 'Link the Goron', 'Links Pocket', 'Lon Lon Tower Freestanding PoH', 'Lost Woods Generic Grotto Chest', 'Malon Egg', 'Man on Roof', 'Mido Chest Bottom Left', 'Mido Chest Bottom Right', 'Mido Chest Top Left', 'Mido Chest Top Right', 'Mirror Shield Chest', 'Morpha', 'Morpha Heart', 'Mountain Storms Grotto Chest', 'Mountain Summit Fairy Reward', 'Ocarina Memory Game', 'Phantom Ganon', 'Phantom Ganon Heart', 'Queen Gohma', 'Queen Gohma Heart', 'Redead Grotto Chest', 'Remote Southern Grotto Chest', 'Rolling Goron as Child', 'Shadow Temple After Wind Enemy Chest', 'Shadow Temple After Wind Hidden Chest', 'Shadow Temple Boss Key Chest', 'Shadow Temple Compass Chest', 'Shadow Temple Early Silver Rupee Chest', 'Shadow Temple Falling Spikes Lower Chest', 'Shadow Temple Falling Spikes Switch Chest', 'Shadow Temple Falling Spikes Upper Chest', 'Shadow Temple Freestanding Key', 'Shadow Temple Hidden Floormaster Chest', 'Shadow Temple Hover Boots Chest', 'Shadow Temple Invisible Blades Invisible Chest', 'Shadow Temple Invisible Blades Visible Chest', 'Shadow Temple Invisible Spikes Chest', 'Shadow Temple Map Chest', 'Shadow Temple Spike Walls Left Chest', 'Shadow Temple Wind Hint Chest', 'Sheik Forest Song', 'Sheik at Colossus', 'Sheik at Temple', 'Sheik in Crater', 'Sheik in Ice Cavern', 'Sheik in Kakariko', 'Shield Grave Chest', 'Silver Gauntlets Chest', 'Skull Kid', 'Song at Windmill', 'Song from Composer Grave', 'Song from Malon', 'Song from Ocarina of Time', 'Song from Saria', 'Spirit Temple Boss Key Chest', 'Spirit Temple Child Climb East Chest', 'Spirit Temple Child Climb North Chest', 'Spirit Temple Child Left Chest', 'Spirit Temple Child Right Chest', 'Spirit Temple Compass Chest', 'Spirit Temple Early Adult Right Chest', 'Spirit Temple First Mirror Left Chest', 'Spirit Temple First Mirror Right Chest', 'Spirit Temple Hallway Left Invisible Chest', 'Spirit Temple Hallway Right Invisible Chest', 'Spirit Temple Map Chest', 'Spirit Temple NE Main Room Chest', 'Spirit Temple Near Four Armos Chest', 'Spirit Temple Statue Hand Chest', 'Spirit Temple Sun Block Room Chest', 'Spirit Temple Topmost Chest', 'Talons Chickens', 'Target in Woods', 'Tektite Grotto Freestanding PoH', 'Top of Crater Grotto Chest', 'Treasure Chest Game', 'Twinrova', 'Twinrova Heart', 'Underwater Bottle', 'Volvagia', 'Volvagia Heart', 'Water Temple Boss Key Chest', 'Water Temple Central Bow Target Chest', 'Water Temple Central Pillar Chest', 'Water Temple Compass Chest', 'Water Temple Cracked Wall Chest', 'Water Temple Dark Link Chest', 'Water Temple Dragon Chest', 'Water Temple Map Chest', 'Water Temple River Chest', 'Water Temple Torches Chest', 'Windmill Freestanding PoH', 'Wolfos Grotto Chest', 'Zelda', 'Zora River Lower Freestanding PoH', 'Zora River Plateau Open Grotto Chest', 'Zora River Upper Freestanding PoH', 'Zoras Domain Torch Run', 'Zoras Fountain Bottom Freestanding PoH', 'Zoras Fountain Fairy Reward', 'Zoras Fountain Iceberg Freestanding PoH']:
