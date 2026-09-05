package in.gopal.college.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    private String title;
    private String author;
    private String isbn;

    @ManyToOne
    @JoinColumn(name = "library_id")
    private Library library;
}
