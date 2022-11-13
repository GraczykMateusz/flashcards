import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {map, take} from 'rxjs';
import {FlashcardsService} from '../../../../services/flashcards/flashcards.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Flashcard} from '../../../../services/flashcards/model/flashcard';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RemoveFlashcardDialogComponent} from './remove-flashcard-dialog/remove-flashcard-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../../common/snack-bar/snack-bar.component';
import {ModifyFlashcardDialogComponent} from './modify-flashcard-dialog/modify-flashcard-dialog.component';

@Component({
  selector: 'app-flashcard-editor',
  templateUrl: './flashcard-editor.component.html',
  styleUrls: ['./flashcard-editor.component.scss'],
})
export class FlashcardEditorComponent {

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  //
  // loading = true;
  // flashcards: Flashcard[] = [];
  // dataSource = new MatTableDataSource<Flashcard>();
  // displayedColumns: string[] = ['content', 'translation', 'image-and-example', 'action'];
  //
  // constructor(private flashcardsService: FlashcardsService,
  //             private auth: AuthService,
  //             private dialog: MatDialog,
  //             private snackBar: MatSnackBar,
  //             private router: Router) {
  // }
  //
  // ngOnInit(): void {
  //   this.auth.getUser()
  //     .pipe(take(1), map(user => user?.email))
  //     .subscribe(email => {
  //       if (email) {
  //         this.auth.email = email;
  //         this.flashcardsService.getFlashcards()
  //           .pipe(take(1))
  //           .subscribe(flashcards => {
  //             this.flashcards = flashcards;
  //             this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
  //             this.dataSource.paginator = this.paginator;
  //             this.loading = false;
  //           });
  //       } else {
  //         this.router.navigateByUrl('/login').then();
  //       }
  //     })
  // }
  //
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  //
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  //
  // deleteFlashcard(flashcardForRemoval: Flashcard) {
  //   this.dialog.open(RemoveFlashcardDialogComponent, {
  //     data: flashcardForRemoval
  //   }).afterClosed().subscribe(result => {
  //     if (result) {
  //       this.flashcardsService.deleteFlashcard(flashcardForRemoval.id)
  //         .then(() => {
  //           this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardForRemoval.id);
  //           this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
  //           this.dataSource.paginator = this.paginator;
  //         })
  //         .catch(() => this.snackBar.openFromComponent(SnackBarComponent, {
  //           duration: 3 * 1000,
  //           data: false
  //         }));
  //     }
  //   })
  // }
  //
  // editFlashcard(flashcardToEdit: Flashcard) {
  //   this.dialog.open(ModifyFlashcardDialogComponent, {
  //     data: flashcardToEdit
  //   }).afterClosed().subscribe(result => {
  //     if (result) {
  //       this.flashcardsService.editFlashcard(flashcardToEdit)
  //         .then(() => {
  //           this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardToEdit.id);
  //           this.flashcards.push(flashcardToEdit);
  //           this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
  //           this.dataSource.paginator = this.paginator;
  //         })
  //         .catch(() => this.snackBar.openFromComponent(SnackBarComponent, {
  //           duration: 3 * 1000,
  //           data: false
  //         }));
  //     }
  //   })
  // }
}
