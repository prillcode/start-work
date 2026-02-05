# Angular Component Patterns

## Component Types

### Smart (Container) Components
Handle business logic, state management, and orchestration.

```typescript
// user-list.component.ts
@Component({
  selector: 'app-user-list',
  template: `
    <app-user-table
      [users]="users$ | async"
      [loading]="loading$ | async"
      (userSelected)="onUserSelected($event)"
      (deleteUser)="onDeleteUser($event)"
    ></app-user-table>
  `
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.loading$ = this.userService.loading$;
  }

  onUserSelected(user: User) {
    this.router.navigate(['/users', user.id]);
  }

  onDeleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe();
  }
}
```

### Dumb (Presentational) Components
Pure UI components with @Input() and @Output().

```typescript
// user-table.component.ts
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() loading = false;
  @Output() userSelected = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  onRowClick(user: User) {
    this.userSelected.emit(user);
  }

  onDeleteClick(user: User) {
    this.deleteUser.emit(user);
  }
}
```

## Lifecycle Hooks

**Common patterns:**
```typescript
export class ExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // Initialize component, fetch data
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.handleData(data));
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Component Communication

### Parent to Child (@Input)
```typescript
@Component({
  selector: 'app-child',
  template: '<div>{{ data }}</div>'
})
export class ChildComponent {
  @Input() data: string;
}
```

### Child to Parent (@Output)
```typescript
@Component({
  selector: 'app-child',
  template: '<button (click)="onClick()">Click</button>'
})
export class ChildComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  onClick() {
    this.buttonClicked.emit();
  }
}
```

### Service Communication (Sibling)
```typescript
@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  sendMessage(msg: string) {
    this.messageSubject.next(msg);
  }
}
```

## Change Detection

### OnPush Strategy (Performance)
```typescript
@Component({
  selector: 'app-optimized',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() data: Data; // Immutable objects only

  // Use observables with async pipe
  data$ = this.service.getData();
}
```

## Common Patterns

### Loading States
```typescript
export class DataComponent {
  loading = false;
  error: string | null = null;
  data: Data[] = [];

  loadData() {
    this.loading = true;
    this.error = null;

    this.service.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
```

### Form Handling
```typescript
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.min(0), Validators.max(120)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      // Handle submission
    }
  }
}
```

### Conditional Rendering
```html
<!-- Loading state -->
<div *ngIf="loading">Loading...</div>

<!-- Error state -->
<div *ngIf="error" class="error">{{ error }}</div>

<!-- Data state -->
<div *ngIf="!loading && !error && data.length > 0">
  <div *ngFor="let item of data">{{ item.name }}</div>
</div>

<!-- Empty state -->
<div *ngIf="!loading && !error && data.length === 0">
  No data available
</div>
```
