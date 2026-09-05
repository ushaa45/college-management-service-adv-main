package in.gopal.college.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import in.gopal.college.entity.College;

public interface CollegeRepository extends JpaRepository<College, Long>{

	 @Query("SELECT DISTINCT c.district FROM College c")
	List<String> getDistricts();

	 @Query("""
		        SELECT DISTINCT c.course
		        FROM College c
		        WHERE c.district=:district
		    """)
	    List<String> getProgrammes(
	            @Param("district")
	            String district);

	    List<College> findByDistrictAndCourse(
	            String district,
	            String course);

	    List<College> findByDistrictAndCourseAndCollegeId(
	            String district,
	            String course,
	            Long collegeId);


}
