import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FlashcardsService} from '../../../../../services/flashcards/flashcards.service';
import {FlashcardImageUploaderService} from '../../../../../services/flashcards/flashcard-creator/flashcard-image-uploader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Flashcard} from '../../../../../services/flashcards/model/flashcard';
import {NewFlashcardDialogComponent} from '../new-flashcard-dialog.component';

@Component({
  selector: 'app-add-flashcard-dialog',
  templateUrl: './add-flashcard-dialog.component.html',
  styleUrls: ['./add-flashcard-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddFlashcardDialogComponent extends NewFlashcardDialogComponent {

  constructor(
    private addDialogRef: MatDialogRef<AddFlashcardDialogComponent>,
    private flashcardsService: FlashcardsService,
    private addFlashcardImageUploaderService: FlashcardImageUploaderService,
    private addSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public addFlashcard: Flashcard
  ) {
    super(addFlashcardImageUploaderService, addSnackBar, addFlashcard);
  }

  save(): void {
    if (!this.canSave()) {
      this.openSnackBar(false)
      return;
    }

    let content = this.flashcardFormGroup.controls.content.value!;
    let translation = this.flashcardFormGroup.controls.translation.value!;
    let example = this.flashcardFormGroup.controls.example.value!;
    const image = this.flashcardFormGroup.controls.image.value!;
    const level = 1;

    if (content != null) content = content.trim();
    if (translation != null) translation = translation.trim();
    if (example != null) example = example.trim();

    this.flashcardsService.createFlashcard(content, translation, example, image, level)
      .then((newFlashcards) => {
        this.openSnackBar(true);
        this.addDialogRef.close({result: newFlashcards});
      }).catch(() => this.openSnackBar(false));
  }

  close(): void {
    this.addDialogRef.close();
  }
}
