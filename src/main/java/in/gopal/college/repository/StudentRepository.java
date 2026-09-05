package in.gopal.college.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.gopal.college.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{

}
