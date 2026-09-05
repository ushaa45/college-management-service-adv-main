package in.gopal.college.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.gopal.college.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
