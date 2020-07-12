from os import getcwd
import tkinter as tk
from PIL import ImageTk, Image
import CallTipWindow

image_directory = getcwd()+'\\Icons\\'

note_dict = {'A':'A', 'Up':'▲', 'Right':'►', 'Down':'▼', 'Left':'◄'}

inventory = {
    'ocarina':0,'minuet':0,'bolero':0,'serenade':0,'requiem':0,'nocturne':0,
    'prelude':0,'lullaby':0,'epona':0,'saria':0,'sun':0,'time':0,'storms':0
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
            inventory[self.name] = self.progress_index
            self.config(image=self.image_list[self.progress_index])
            if self.progress_index == 1 and self.additional_function:
                self.additional_function('p')

    def regress(self, event):
        if self.progress_index > 0:
            self.progress_index -= 1
            inventory[self.name] = self.progress_index
            self.config(image=self.image_list[self.progress_index])
            if self.progress_index == 0 and self.additional_function:
                self.additional_function('r')


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

root = tk.Tk()
root.title('ZOoTR Tracker')
root.geometry('302x35')
##root.configure(bg='red')

# Ocarina
ocarina_frame = tk.Frame(height=35, width=302)
ocarina_frame.place(x=0, y=0)
ocarina = ProgressiveButton(ocarina_frame, 'ocarina', change_ocarina_background)
ocarina.place(x=0, y=0)
minuet = SongButton(ocarina_frame, 'minuet', ['A', 'Up', 'Left', 'Right', 'Left', 'Right'])
minuet.place(x=36, y=0)
bolero = SongButton(ocarina_frame, 'bolero', ['Down', 'A', 'Down', 'A', 'Right', 'Down', 'Right', 'Down'])
bolero.place(x=58, y=0)
serenade = SongButton(ocarina_frame, 'serenade', ['A', 'Down', 'Right', 'Right', 'Left'])
serenade.place(x=80, y=0)
requiem = SongButton(ocarina_frame, 'requiem', ['A', 'Down', 'A', 'Left', 'Down', 'A'])
requiem.place(x=102, y=0)
nocturne = SongButton(ocarina_frame, 'nocturne', ['Left', 'Right', 'Right', 'A', 'Left', 'Right', 'Down'])
nocturne.place(x=124, y=0)
prelude = SongButton(ocarina_frame, 'prelude', ['Up', 'Right', 'Up', 'Right', 'Left', 'Up'])
prelude.place(x=146, y=0)
lullaby = SongButton(ocarina_frame, 'lullaby', ['Left', 'Up', 'Right', 'Left', 'Up', 'Right'])
lullaby.place(x=168, y=0)
epona = SongButton(ocarina_frame, 'epona', ['Up', 'Left', 'Right', 'Up', 'Left', 'Right'])
epona.place(x=190, y=0)
saria = SongButton(ocarina_frame, 'saria', ['Down', 'Right', 'Left', 'Down', 'Right', 'Left'])
saria.place(x=212, y=0)
sun = SongButton(ocarina_frame, 'sun', ['Right', 'Down', 'Up', 'Right', 'Down', 'Up'])
sun.place(x=234, y=0)
time = SongButton(ocarina_frame, 'time', ['Right', 'A', 'Down', 'Right', 'A', 'Down'])
time.place(x=256, y=0)
storms = SongButton(ocarina_frame, 'storms', ['A', 'Down', 'Up', 'A', 'Down', 'Up'])
storms.place(x=278, y=0)
ocarina_stuff += [ocarina_frame, ocarina, minuet, bolero, serenade, requiem, nocturne, prelude, lullaby, epona, saria, sun, time, storms]
change_ocarina_background('r')

root.mainloop()

