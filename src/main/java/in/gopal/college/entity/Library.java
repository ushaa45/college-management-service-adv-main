package in.gopal.college.entity;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "library")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Library {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryId;

    private String libraryName;

    @ManyToOne
    @JoinColumn(name = "college_id")
    private College college;

    @OneToMany(mappedBy = "library", cascade = CascadeType.ALL)
    private List<Book> books;
}
