from os import getcwd
import tkinter as tk
from PIL import ImageTk, Image #pip install pillow
import CallTipWindow
from checks import *
##from tricks import *

image_directory = getcwd()+'\\Icons\\'

note_dict = {'A':'A', 'Up':'▲', 'Right':'►', 'Down':'▼', 'Left':'◄'}

key_counts = {
    'deku':0, 'dodongo':0, 'jabu':0,
    'forest':5, 'fire':8, 'water':6, 'shadow':5, 'spirit':5,
    'well':3, 'ice':0, 'gtg':9, 'ganon':2
    }

total_checks = {
    'deku':7, 'dodongo':7, 'jabu':4,
    'forest':14, 'fire':15, 'water':11, 'shadow':18, 'spirit':18,
    'well':14, 'ice': 5, 'gtg':22, 'ganon':16
    }

key_counts_mq = {
    'deku':0, 'dodongo':0, 'jabu':0,
    'forest':6, 'fire':5, 'water':2, 'shadow':6, 'spirit':7,
    'well':2, 'ice':0, 'gtg':3, 'ganon':3
    }

total_checks_mq = {
    'deku':8, 'dodongo':8, 'jabu':12,
    'forest':13, 'fire':13, 'water':7, 'shadow':21, 'spirit':23,
    'well':5, 'ice': 5, 'gtg':17, 'ganon':14
    }

global_inventory = {
    'ocarina':0,'minuet':0,'bolero':0,'serenade':0,'requiem':0,'nocturne':0,
    'prelude':0,'lullaby':0,'epona':0,'saria':0,'sun':0,'time':0,'storms':0,
    'magic':0,'lens':0,'din':0,'farore':0,
    'bow':0,'arrowsfire':0,'arrowslight':0
    }


class ProgressiveButton(tk.Label):

    def __init__(self, master, name, additional_function=None):
        self.name = name
        self.image_list = []
        self.progress_index = 0
        self.additional_function = additional_function
        for i in range(12):
            try:
                image_path = image_directory+name+str(i)+'.png'
                image = ImageTk.PhotoImage(Image.open(image_path))
                self.image_list.append(image)
            except FileNotFoundError:
                continue
        tk.Label.__init__(self, master, image=self.image_list[0])
        self.bind("<Button-1>", self.progress)
        self.bind("<Button-3>", self.regress)

    def progress(self, event):
        if self.progress_index+1 < len(self.image_list):
            self.progress_index += 1
            global_inventory[self.name] = self.progress_index
            self.config(image=self.image_list[self.progress_index])
            if self.progress_index == 1 and self.additional_function:
                if callable(self.additional_function):
                    self.additional_function('p')
                else:
                    for function in self.additional_function:
                        function('p')

    def regress(self, event):
        if self.progress_index > 0:
            self.progress_index -= 1
            global_inventory[self.name] = self.progress_index
            self.config(image=self.image_list[self.progress_index])
            if self.progress_index == 0 and self.additional_function:
                if callable(self.additional_function):
                    self.additional_function('r')
                else:
                    for function in self.additional_function:
                        function('r')


class SongButton(ProgressiveButton):

    def __init__(self, master, name, notes):
        ProgressiveButton.__init__(self, master, name)
        self.name = name
        self.notes = notes
        CallTipWindow.createToolTip(self, self.name.capitalize()+': ' + ' '.join([note_dict[note] for note in notes]))
        
    def show_song(self, event):
        print(self.notes)
        

##def callback(event):
##    print("clicked at", event.x, event.y)

ocarina_stuff = []
def change_ocarina_background(progress_or_regress):
    for element in ocarina_stuff:
        if progress_or_regress == 'p':
            element.configure(bg='SystemButtonFace')
        if progress_or_regress == 'r':
            element.configure(bg='gray')

magic_stuff = []
def change_magic_background(progress_or_regress):
    for element in magic_stuff:
        if progress_or_regress == 'p':
            element.configure(bg='SystemButtonFace')
        if progress_or_regress == 'r':
            element.configure(bg='gray')

arrow_stuff = []
def change_arrows_background(progress_or_regress):
    if global_inventory['bow'] > 0 and global_inventory['magic'] > 0:
        for element in arrow_stuff:
            element.configure(bg='SystemButtonFace')
    else:
        for element in arrow_stuff:
            element.configure(bg='gray')
    

root = tk.Tk()
root.title('ZOoTR Tracker')
root.geometry('244x200')
##root.configure(bg='red')

# Ocarina
ocarina_frame = tk.Frame(width=244, height=70)
ocarina_frame.place(x=0, y=0)
ocarina = ProgressiveButton(ocarina_frame, 'ocarina', change_ocarina_background)
ocarina.place(x=0, y=20)
lullaby = SongButton(ocarina_frame, 'lullaby', ['Left', 'Up', 'Right', 'Left', 'Up', 'Right'])
lullaby.place(x=36, y=0)
epona = SongButton(ocarina_frame, 'epona', ['Up', 'Left', 'Right', 'Up', 'Left', 'Right'])
epona.place(x=70, y=0)
saria = SongButton(ocarina_frame, 'saria', ['Down', 'Right', 'Left', 'Down', 'Right', 'Left'])
saria.place(x=104, y=0)
sun = SongButton(ocarina_frame, 'sun', ['Right', 'Down', 'Up', 'Right', 'Down', 'Up'])
sun.place(x=138, y=0)
time = SongButton(ocarina_frame, 'time', ['Right', 'A', 'Down', 'Right', 'A', 'Down'])
time.place(x=176, y=0)
storms = SongButton(ocarina_frame, 'storms', ['A', 'Down', 'Up', 'A', 'Down', 'Up'])
storms.place(x=210, y=0)
minuet = SongButton(ocarina_frame, 'minuet', ['A', 'Up', 'Left', 'Right', 'Left', 'Right'])
minuet.place(x=36, y=35)
bolero = SongButton(ocarina_frame, 'bolero', ['Down', 'A', 'Down', 'A', 'Right', 'Down', 'Right', 'Down'])
bolero.place(x=70, y=35)
serenade = SongButton(ocarina_frame, 'serenade', ['A', 'Down', 'Right', 'Right', 'Left'])
serenade.place(x=104, y=35)
requiem = SongButton(ocarina_frame, 'requiem', ['A', 'Down', 'A', 'Left', 'Down', 'A'])
requiem.place(x=138, y=35)
nocturne = SongButton(ocarina_frame, 'nocturne', ['Left', 'Right', 'Right', 'A', 'Left', 'Right', 'Down'])
nocturne.place(x=176, y=35)
prelude = SongButton(ocarina_frame, 'prelude', ['Up', 'Right', 'Up', 'Right', 'Left', 'Up'])
prelude.place(x=210, y=35)
ocarina_stuff += [ocarina_frame, ocarina, minuet, bolero, serenade, requiem, nocturne, prelude, lullaby, epona, saria, sun, time, storms]
change_ocarina_background('r')

# Magic
magic_frame = tk.Frame(width=140, height=38)
magic_frame.place(x=0, y=70)
magic = ProgressiveButton(magic_frame, 'magic', [change_magic_background, change_arrows_background])
magic.place(x=0, y=0)
lens = ProgressiveButton(magic_frame, 'lens')
lens.place(x=35, y=0)
din = ProgressiveButton(magic_frame, 'din')
din.place(x=75, y=0)
farore = ProgressiveButton(magic_frame, 'farore')
farore.place(x=104, y=0)
magic_stuff += [magic_frame, magic, lens, din, farore]
change_magic_background('r')
##magic_frame.place_forget() - remove elements

# Bow & Arrows
bow = ProgressiveButton(root, 'bow', change_arrows_background)
bow.place(x=0, y=108)
arrow_frame = tk.Frame(width=102, height=38)
arrow_frame.place(x=38, y=108)
arrowsfire = ProgressiveButton(arrow_frame, 'arrowsfire')
arrowsfire.place(x=0, y=0)
arrowslight = ProgressiveButton(arrow_frame, 'arrowslight')
arrowslight.place(x=35, y=0)
arrow_stuff += [arrow_frame, arrowsfire, arrowslight]
change_arrows_background('r')




def check_requirements(requirements, inventory=global_inventory):
    if requirements == True:
        return True
    elif type(requirements) == dict: # AND
        result = True
        for key in requirements:
            if callable(key):
                if not key():
                    result = False
                    break
                else:
                    if not check_requirements(requirements[key], inventory):
                        result = False
                        break
            elif type(key) == str:
                if inventory[key] < requirements[key]:
                    result = False
    elif type(requirements) == list: # OR
        result = False
        for item in requirements:
            if check_requirements(item, inventory):
                result = True
                break
    return result


locations = {}

class Location():

    def __init__(self, name, child_or_adult, requirements):
        self.name = name
        self.requirements = requirements
        self.child_or_adult = child_or_adult
        checks[name] = self

##Location('Kokiri Forest', 'both', True)
##Location('Deku Tree', 'child', True)
##Location('Lost Woods', 'both', True)
##Location('Sacred Forest Meadow', 'both', {is_adult:True, child_can_attack:True}
##Location('Hyrule Field', [{'ocarina':0}], 'both')
##Location('Kakariko', [{'ocarina':0}], 'both')
##Location('Well', [{'storms':0}], 'child')
##Location('Castle Town', [{'ocarina':0}], 'both')
##Location('Hyrule Castle', [{'ocarina':0}], 'child')
##Location("Outside Ganon's Castle", [{'ocarina':0}], 'child')
##Location("Ganon's Castle", [{'medallionforest':1,'medallionfire':1,'medallionwater':1,'medallionspirit':1,'medallionshadow':1,'medallionlight':1}], 'adult')
##Location('Death Mountain Trail', [{'is_adult':1},{'bombs':1},{'child':3}], 'both')
##Location('Goron City', [{is_adult:1},{'bombs':1},{'child':3}], 'both')
##Location("Dodongo's Cavern", [{is_adult:1},{'bombs':1},{'child':3,'bombs':1},{'child':3,'strength':1}], 'both')
##Location("Zora's River", [{is_adult:1},{'bombs':1},{'scale':1}], 'both')
##Location("Zora's Domain", [{is_adult:1, 'lullaby':1}, {is_adult:1, 'bootshover':1}, {'bombs':1}, {'scale':1}], 'both')
##Location("Zora's Fountain", [{can_access_zoras_domain:



root.mainloop()

