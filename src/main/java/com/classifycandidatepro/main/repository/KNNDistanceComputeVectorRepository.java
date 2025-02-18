package com.classifycandidatepro.main.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classifycandidatepro.model.KNNDistanceComputeVector;


@Repository
public interface KNNDistanceComputeVectorRepository extends JpaRepository<KNNDistanceComputeVector, Long> {

}
